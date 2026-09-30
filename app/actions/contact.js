"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";

// Sends contact-form messages through Resend's HTTP API.
// Requires RESEND_API_KEY. Without a verified domain, Resend's test sender
// (onboarding@resend.dev) can only deliver to the account owner's address — which is fine here.
const FROM = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

// Best-effort, per-instance rate limit: 3 messages per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(_prev, formData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const trap = String(formData.get("company") ?? "");

  // Honeypot: real visitors never see this field.
  if (trap) return { ok: true };

  const errors = {};
  if (name.length < 2 || name.length > 100) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Please enter a valid email.";
  if (message.length < 10 || message.length > 5000)
    errors.message = "Message should be between 10 and 5000 characters.";
  if (Object.keys(errors).length) return { ok: false, errors, values: { name, email, message } };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return {
      ok: false,
      error: "Too many messages — please try again in a few minutes.",
      values: { name, email, message },
    };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return {
      ok: false,
      error: `The form isn't configured yet — please email ${site.email} directly.`,
      values: { name, email, message },
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [site.email],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return { ok: true };
  } catch (err) {
    console.error("contact form:", err);
    return {
      ok: false,
      error: `Something went wrong sending your message — please email ${site.email} directly.`,
      values: { name, email, message },
    };
  }
}
