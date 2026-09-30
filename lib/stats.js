import "server-only";
import { site } from "@/content/site";

// Public profile stats for the Problem Solving section.
// Fetched at build time and re-fetched at most once a day (see `revalidate` in app/page.js).
// Any source that fails falls back to the values below, so the page never breaks.
const fallback = {
  codeforces: { maxRating: 1267, solved: 1318, contests: null },
  leetcode: { solved: null, easy: null, medium: null, hard: null },
  github: { repos: null, contributions: null },
};

const DAY = 60 * 60 * 24;

async function getJson(url, init = {}) {
  const res = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(6000),
    next: { revalidate: DAY },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function codeforces() {
  const handle = site.handles.codeforces;
  const [info, rating] = await Promise.allSettled([
    getJson(`https://codeforces.com/api/user.info?handles=${handle}`),
    getJson(`https://codeforces.com/api/user.rating?handle=${handle}`),
  ]);
  const maxRating =
    info.status === "fulfilled" ? info.value.result?.[0]?.maxRating : null;
  const contests =
    rating.status === "fulfilled" ? rating.value.result?.length : null;
  return {
    // Solved count needs the full submission history (several MB), so it stays manual.
    solved: fallback.codeforces.solved,
    maxRating: maxRating ?? fallback.codeforces.maxRating,
    contests: contests ?? fallback.codeforces.contests,
  };
}

async function leetcode() {
  try {
    const data = await getJson("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({
        query: `query($u: String!) { matchedUser(username: $u) { submitStatsGlobal { acSubmissionNum { difficulty count } } } }`,
        variables: { u: site.handles.leetcode },
      }),
    });
    const rows = data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
    if (!rows) return fallback.leetcode;
    const by = Object.fromEntries(rows.map((r) => [r.difficulty, r.count]));
    return { solved: by.All, easy: by.Easy, medium: by.Medium, hard: by.Hard };
  } catch {
    return fallback.leetcode;
  }
}

async function github() {
  const user = site.handles.github;
  const token = process.env.GITHUB_TOKEN;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const [profile, graph] = await Promise.allSettled([
    getJson(`https://api.github.com/users/${user}`, { headers }),
    // Contribution count is only available through the GraphQL API, which needs a token.
    token
      ? getJson("https://api.github.com/graphql", {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query($u: String!) { user(login: $u) { contributionsCollection { contributionCalendar { totalContributions } } } }`,
            variables: { u: user },
          }),
        })
      : Promise.reject(new Error("no token")),
  ]);

  return {
    repos:
      profile.status === "fulfilled"
        ? profile.value.public_repos
        : fallback.github.repos,
    contributions:
      graph.status === "fulfilled"
        ? graph.value.data?.user?.contributionsCollection?.contributionCalendar
            ?.totalContributions ?? null
        : fallback.github.contributions,
  };
}

export async function getProfileStats() {
  const [cf, lc, gh] = await Promise.all([
    codeforces().catch(() => fallback.codeforces),
    leetcode(),
    github().catch(() => fallback.github),
  ]);
  return { codeforces: cf, leetcode: lc, github: gh };
}
