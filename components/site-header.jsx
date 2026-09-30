"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { cn } from "cn";
import { navLinks, site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-[15px] font-semibold text-fg hover:text-fg">
      <span className="inline-flex size-7 items-center justify-center rounded-[7px] bg-violet-bg font-mono text-xs text-violet-soft">
        {site.initials}
      </span>
      {site.name}
    </Link>
  );
}

// variant "home" shows the section nav; "subpage" shows a back link.
export function SiteHeader({ variant = "home" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-200",
        scrolled
          ? "border-line bg-ink/90 backdrop-blur-md"
          : "border-transparent bg-ink"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-4 sm:px-10">
        <Logo />

        {variant === "home" ? (
          <>
            <div className="hidden items-center gap-7 lg:flex">
              <nav aria-label="Sections" className="flex gap-5 xl:gap-6">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} className="py-2.5 text-sm text-muted-1 hover:text-fg">
                    {l.label}
                  </a>
                ))}
              </nav>
              {site.resume && (
                <a href={site.resume} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                  View Resume
                </a>
              )}
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "lg:hidden")}
                aria-label="Open menu"
              >
                <MenuIcon className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[82%] border-line bg-surface p-6 pt-16">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <nav aria-label="Sections" className="flex flex-col">
                  {navLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="border-b border-line py-3.5 text-base text-fg-3 hover:text-fg"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
                {site.resume && (
                  <a href={site.resume} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline" }), "mt-4")}>
                    View Resume
                  </a>
                )}
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <div className="flex items-center gap-6">
            <Link href="/#projects" className="py-2.5 text-sm text-muted-1 hover:text-fg">
              ← All projects
            </Link>
            {site.resume && (
              <a href={site.resume} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden sm:inline-flex")}>
                View Resume
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
