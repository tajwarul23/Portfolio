import { cn } from "cn";

export function SectionHeading({ eyebrow, title, className, titleClassName, children }) {
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      <div className="eyebrow">{eyebrow}</div>
      <h2
        className={cn(
          "text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[40px]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

export function ExternalLink({ href, className, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className} {...props}>
      {children}
    </a>
  );
}
