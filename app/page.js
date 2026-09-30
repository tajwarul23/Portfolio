import { site, siteUrl } from "@/content/site";
import { getProfileStats } from "@/lib/stats";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Projects } from "@/components/home/projects";
import { Engineering, Stack } from "@/components/home/engineering";
import { ProblemSolving } from "@/components/home/problem-solving";
import { Education } from "@/components/home/education";
import { Contact } from "@/components/home/contact";

// Re-render at most once a day so the Problem Solving stats stay fresh.
export const revalidate = 86400;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: siteUrl,
  email: `mailto:${site.email}`,
  alumniOf: "Sylhet Engineering College",
  sameAs: Object.values(site.links),
};

export default async function Home() {
  const stats = await getProfileStats();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SiteHeader />
      <main id="main">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-10">
          <Hero />
          <About />
          <Projects />
          <Engineering />
          <Stack />
        </div>
        <ProblemSolving stats={stats} />
        <div className="mx-auto max-w-[1160px] px-4 sm:px-10">
          <Education />
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
