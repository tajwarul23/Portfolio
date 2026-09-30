import { site } from "@/content/site";

export function SiteFooter({ showLinks = true }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-6 px-4 pt-9 pb-11 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex flex-col gap-1">
          <span className="text-[15px] font-semibold">{site.name}</span>
          <span className="text-[13px] text-muted-2">{site.role}</span>
        </div>
        {showLinks && (
          <div className="flex gap-6">
            <a className="py-2.5 text-sm text-muted-1 hover:text-fg" href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="py-2.5 text-sm text-muted-1 hover:text-fg" href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="py-2.5 text-sm text-muted-1 hover:text-fg" href={`mailto:${site.email}`}>Email</a>
          </div>
        )}
        <span className="font-mono text-xs text-dim">© {new Date().getFullYear()} {site.name}</span>
      </div>
    </footer>
  );
}
