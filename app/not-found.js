import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-[1160px] flex-col items-start justify-center gap-6 px-4 sm:px-10">
      <span className="eyebrow">404</span>
      <h1 className="text-[44px] leading-[1.05] font-semibold tracking-[-0.035em]">This page doesn&apos;t exist.</h1>
      <p className="text-lg text-fg-3">The link may be broken, or the page may have moved.</p>
      <Link href="/" className={buttonVariants()}>Back to home</Link>
    </main>
  );
}
