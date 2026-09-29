"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";

/* ---------------- shared field primitives (work on dark and light surfaces) ---------------- */

type Tone = "dark" | "light";

const fieldCls = (tone: Tone, invalid: boolean) =>
  [
    "mt-2 block w-full rounded-xl border px-4 py-3 text-[16px] outline-none transition-colors",
    tone === "dark"
      ? "border-line bg-ink-3 text-paper placeholder:text-mist/50 focus:border-teal"
      : "border-ink/20 bg-white text-ink placeholder:text-ink/40 focus:border-teal-deep",
    invalid ? (tone === "dark" ? "border-[#f19a9a]" : "border-[#b42318]") : "",
  ].join(" ");

function Field({
  label,
  name,
  tone,
  error,
  type = "text",
  required,
  autoComplete,
  textarea,
  hint,
}: {
  label: string;
  name: string;
  tone: Tone;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  textarea?: boolean;
  hint?: string;
}) {
  const id = useId();
  const errId = `${id}-err`;
  const common = {
    id,
    name,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
    className: fieldCls(tone, !!error),
  };
  return (
    <div>
      <label htmlFor={id} className={`text-[14px] ${tone === "dark" ? "text-mist" : "text-ink/70"}`}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span className="opacity-70"> (optional)</span>}
      </label>
      {textarea ? (
        <textarea {...common} rows={5} maxLength={4000} placeholder={hint} />
      ) : (
        <input {...common} type={type} autoComplete={autoComplete} maxLength={200} placeholder={hint} />
      )}
      {error && (
        <p id={errId} className={`mt-1.5 text-[13px] ${tone === "dark" ? "text-[#f19a9a]" : "text-[#b42318]"}`}>
          {error === "Required" ? `Please enter your ${label.toLowerCase()}.` : error}
        </p>
      )}
    </div>
  );
}

function Check({ name, tone, error, children }: { name: string; tone: Tone; error?: string; children: ReactNode }) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          className={`mt-1 h-5 w-5 shrink-0 ${tone === "dark" ? "accent-teal" : "accent-teal-deep"}`}
          aria-invalid={error ? true : undefined}
        />
        <label htmlFor={id} className={`text-[14px] leading-relaxed ${tone === "dark" ? "text-mist" : "text-ink/70"}`}>
          {children}
        </label>
      </div>
      {error && (
        <p className={`ml-8 mt-1 text-[13px] ${tone === "dark" ? "text-[#f19a9a]" : "text-[#b42318]"}`}>
          Please confirm to continue.
        </p>
      )}
    </div>
  );
}

/** Hidden honeypot — real users never see or fill it. */
function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Client-side check mirroring the server rules, so people get field hints without a round trip. */
function validate(payload: Record<string, unknown>, required: string[]) {
  const errors: Record<string, string> = {};
  for (const k of required) if (!String(payload[k] ?? "").trim()) errors[k] = "Required";
  const email = String(payload.email ?? "").trim();
  if (email && !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (payload.consent !== true) errors.consent = "Required";
  return errors;
}

type Status = { state: "idle" } | { state: "sending" } | { state: "error"; message: string } | { state: "done" };

async function post(url: string, payload: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  let data: { ok?: boolean; errors?: Record<string, string>; error?: string; url?: string } = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON */
  }
  return { res, data };
}

/* ---------------- contact form ---------------- */

export function ContactForm({ email }: { email: string }) {
  const started = useRef(0);
  useEffect(() => {
    started.current = Date.now();
  }, []);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const tone: Tone = "dark";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      name: String(f.get("name") ?? ""),
      email: String(f.get("email") ?? ""),
      company: String(f.get("company") ?? ""),
      role: String(f.get("role") ?? ""),
      modality: String(f.get("modality") ?? ""),
      message: String(f.get("message") ?? ""),
      consent: f.get("consent") === "on",
      website: String(f.get("website") ?? ""),
      startedAt: started.current,
    };
    const local = validate(payload, ["name", "email", "company", "message"]);
    if (Object.keys(local).length) {
      setErrors(local);
      setStatus({ state: "error", message: "Please check the highlighted fields." });
      return;
    }
    setStatus({ state: "sending" });
    setErrors({});
    try {
      const { res, data } = await post("/api/contact", payload);
      if (res.ok && data.ok) {
        setStatus({ state: "done" });
        return;
      }
      if (data.errors) setErrors(data.errors);
      setStatus({ state: "error", message: data.error ?? "Please check the highlighted fields." });
    } catch {
      setStatus({ state: "error", message: "Network error — please try again." });
    }
  }

  if (status.state === "done") {
    return (
      <div role="status" className="rounded-2xl border border-teal/40 bg-ink-2 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">Message received</p>
        <p className="mt-3 text-2xl font-medium text-paper">Thank you — we’ll get back to you shortly.</p>
        <p className="mt-3 text-[15px] text-mist">
          For anything urgent, email{" "}
          <a className="text-paper underline underline-offset-4" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot />
      <Field label="Name" name="name" tone={tone} required autoComplete="name" error={errors.name} />
      <Field label="Work email" name="email" type="email" tone={tone} required autoComplete="email" error={errors.email} />
      <Field label="Company" name="company" tone={tone} required autoComplete="organization" error={errors.company} />
      <Field label="Role" name="role" tone={tone} autoComplete="organization-title" error={errors.role} />
      <div className="sm:col-span-2">
        <Field
          label="Modality"
          name="modality"
          tone={tone}
          hint="e.g. T-cell engager, CAR-T cells, antibody"
          error={errors.modality}
        />
      </div>
      <div className="sm:col-span-2">
        <Field
          label="What would you like to find out?"
          name="message"
          tone={tone}
          required
          textarea
          hint="Your cells, the question and the decision you need to make."
          error={errors.message}
        />
      </div>
      <div className="sm:col-span-2">
        <Check name="consent" tone={tone} error={errors.consent}>
          I agree that InterAcTec stores my details to answer this request, as described in the{" "}
          <Link href="/privacy" className="text-paper underline underline-offset-4">
            privacy policy
          </Link>
          .
        </Check>
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="inline-flex h-12 items-center justify-center rounded-full bg-teal px-7 text-base font-medium text-ink transition-colors hover:bg-paper disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending…" : "Send message"}
        </button>
        <span className="text-[14px] text-mist">
          or email{" "}
          <a className="text-paper underline underline-offset-4" href={`mailto:${email}`}>
            {email}
          </a>
        </span>
      </div>
      <p aria-live="polite" className="text-[14px] text-[#f19a9a] sm:col-span-2">
        {status.state === "error" ? status.message : ""}
      </p>
    </form>
  );
}

/* ---------------- case-study request form ---------------- */

export function CaseStudyForm({ slug, title }: { slug: string; title: string }) {
  const started = useRef(0);
  useEffect(() => {
    started.current = Date.now();
  }, []);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [url, setUrl] = useState<string | null>(null);
  const tone: Tone = "light";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      caseStudy: slug,
      name: String(f.get("name") ?? ""),
      email: String(f.get("email") ?? ""),
      company: String(f.get("company") ?? ""),
      consent: f.get("consent") === "on",
      updates: f.get("updates") === "on",
      website: String(f.get("website") ?? ""),
      startedAt: started.current,
    };
    const local = validate(payload, ["name", "email", "company"]);
    if (Object.keys(local).length) {
      setErrors(local);
      setStatus({ state: "error", message: "Please check the highlighted fields." });
      return;
    }
    setStatus({ state: "sending" });
    setErrors({});
    try {
      const { res, data } = await post("/api/case-study", payload);
      if (res.ok && data.ok && data.url) {
        setUrl(data.url);
        setStatus({ state: "done" });
        window.location.assign(data.url);
        return;
      }
      if (data.errors) setErrors(data.errors);
      setStatus({ state: "error", message: data.error ?? "Please check the highlighted fields." });
    } catch {
      setStatus({ state: "error", message: "Network error — please try again." });
    }
  }

  if (status.state === "done" && url) {
    return (
      <div role="status" className="rounded-xl border border-teal-deep/40 bg-teal-deep/[0.06] p-5">
        <p className="font-medium text-ink">Your download has started.</p>
        <p className="mt-1 text-[14px] text-ink/70">
          Not started?{" "}
          <a href={url} className="text-teal-deep underline underline-offset-4">
            Download “{title}” again
          </a>{" "}
          (link valid for 24 hours).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-4">
      <Honeypot />
      <Field label="Name" name="name" tone={tone} required autoComplete="name" error={errors.name} />
      <Field label="Work email" name="email" type="email" tone={tone} required autoComplete="email" error={errors.email} />
      <Field label="Company" name="company" tone={tone} required autoComplete="organization" error={errors.company} />
      <Check name="consent" tone={tone} error={errors.consent}>
        I agree that InterAcTec stores my details to provide this case study, as described in the{" "}
        <Link href="/privacy" className="text-ink underline underline-offset-4">
          privacy policy
        </Link>
        .
      </Check>
      <Check name="updates" tone={tone}>
        Keep me informed about new case studies (optional, unsubscribe anytime).
      </Check>
      <button
        type="submit"
        disabled={status.state === "sending"}
        className="mt-1 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-base text-paper transition-colors hover:bg-ink-3 disabled:opacity-60"
      >
        {status.state === "sending" ? "Preparing download…" : "Get the PDF"}
      </button>
      <p aria-live="polite" className="text-[14px] text-[#b42318]">
        {status.state === "error" ? status.message : ""}
      </p>
    </form>
  );
}
