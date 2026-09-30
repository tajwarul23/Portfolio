import { scamScanner } from "./scam-scanner";

// Order here is the "Next case study" order.
export const caseStudies = [scamScanner];

export function getCaseStudy(slug) {
  return caseStudies.find((c) => c.slug === slug) ?? null;
}

export function getNextCaseStudy(slug) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i === -1 || caseStudies.length < 2) return null;
  return caseStudies[(i + 1) % caseStudies.length];
}
