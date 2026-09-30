"use client";

import { useActionState, useState } from "react";
import { sendContactMessage } from "@/app/actions/contact";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

const inputCls =
  "h-[46px] rounded-[10px] border border-line-2 bg-surface-2 px-3.5 text-[15px] text-fg placeholder:text-dim focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-violet aria-invalid:border-risk/60";

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-2 text-[13px] text-muted-1">
      {label}
      {children}
      {error && <span className="text-xs text-risk">{error}</span>}
    </label>
  );
}

// `emailEnabled` is true when RESEND_API_KEY is configured. Otherwise the form
// opens the visitor's mail app with the message pre-filled.
export function ContactForm({ emailEnabled }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, null);
  const [mailtoSent, setMailtoSent] = useState(false);
  const [dismissed, setDismissed] = useState(null);

  const sent = (state?.ok && dismissed !== state) || mailtoSent;
  const values = state?.values ?? {};
  const errors = state?.errors ?? {};

  function handleMailto(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Portfolio message from ${data.get("name")}`;
    const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailtoSent(true);
  }

  const card = "relative flex flex-col gap-4 self-start rounded-[18px] border border-line bg-surface p-6 sm:p-8";

  if (sent) {
    return (
      <div className={cn(card, "gap-2.5")} role="status">
        <span className="text-xl font-semibold">{mailtoSent ? "Almost there." : "Message sent."}</span>
        <span className="text-[15px] text-muted-1">
          {mailtoSent
            ? "Your email app should have opened with the message filled in — hit send there."
            : "Thanks for reaching out — I'll get back to you soon."}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-1.5 self-start"
          onClick={() => {
            setMailtoSent(false);
            setDismissed(state);
          }}
        >
          Back to form
        </Button>
      </div>
    );
  }

  return (
    <form
      action={emailEnabled ? formAction : undefined}
      onSubmit={emailEnabled ? undefined : handleMailto}
      className={card}
      noValidate={emailEnabled}
    >
      <Field label="Name" error={errors.name}>
        <input name="name" type="text" required autoComplete="name" placeholder="Your name" defaultValue={values.name} aria-invalid={!!errors.name} className={inputCls} />
      </Field>
      <Field label="Email" error={errors.email}>
        <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" defaultValue={values.email} aria-invalid={!!errors.email} className={inputCls} />
      </Field>
      <Field label="Message" error={errors.message}>
        <textarea name="message" required placeholder="What would you like to talk about?" defaultValue={values.message} aria-invalid={!!errors.message} className={cn(inputCls, "h-[130px] resize-y py-3")} />
      </Field>
      {/* Honeypot — hidden from people, often filled by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Company<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {state?.error && <p className="text-sm text-risk" role="alert">{state.error}</p>}
      <Button type="submit" disabled={pending} className="justify-center">
        {pending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
