import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/home/contact-form";

export function Contact() {
  const rows = [
    ["Email", site.email, `mailto:${site.email}`, false],
    ["LinkedIn", "linkedin.com/in/tajwarul-chowdhury", site.links.linkedin, true],
    ["GitHub", `github.com/${site.handles.github}`, site.links.github, true],
  ];

  return (
    <section id="contact" className="grid gap-12 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
      <div className="flex flex-col gap-[22px]">
        <div className="eyebrow">Contact</div>
        <h2 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-[52px]">Let&apos;s Connect</h2>
        <p className="max-w-[440px] text-lg leading-relaxed text-fg-3">
          I&apos;m currently open to Software Engineering opportunities and interesting technical projects.
        </p>
        <a href={`mailto:${site.email}`} className={`${buttonVariants()} self-start`}>Get in Touch</a>
        <div className="mt-3 flex flex-col border-t border-line">
          {rows.map(([label, text, href, external]) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="flex justify-between gap-4 border-b border-line py-4 text-[15px]"
            >
              <span className="text-muted-1">{label}</span>
              <span className="truncate">{text}{external && " ↗"}</span>
            </a>
          ))}
        </div>
      </div>
      <ContactForm emailEnabled={Boolean(process.env.RESEND_API_KEY)} />
    </section>
  );
}
