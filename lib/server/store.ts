/**
 * Server-only helpers for the Cloudflare Worker runtime.
 * Everything is stored in the existing R2 bucket bound as REPORTS — no extra services.
 *
 *   config/download-secret   HMAC key for signed download links (auto-created)
 *   config/admin-key         key for the /admin inbox (auto-created, read it in the R2 dashboard)
 *   inquiries/contact/…      contact form submissions (JSON)
 *   inquiries/downloads/…    case-study download requests (JSON)
 */

export type Env = CloudflareEnv;

export async function getEnv(): Promise<Env | null> {
  try {
    return (await import("cloudflare:workers")).env as Env;
  } catch {
    return null;
  }
}

const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/** Read a secret from R2; create a random one on first use. */
export async function getOrCreateSecret(env: Env, name: "download-secret" | "admin-key"): Promise<string> {
  const key = `config/${name}`;
  const existing = await env.REPORTS.get(key);
  if (existing) return (await existing.text()).trim();
  const value = b64url(crypto.getRandomValues(new Uint8Array(32)));
  await env.REPORTS.put(key, value, {
    httpMetadata: { contentType: "text/plain" },
    customMetadata: { created: new Date().toISOString() },
  });
  // Re-read so concurrent first requests converge on the stored value.
  const stored = await env.REPORTS.get(key);
  return stored ? (await stored.text()).trim() : value;
}

async function hmac(secret: string, data: string) {
  const k = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return b64url(new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(data))));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export const DOWNLOAD_TTL_SECONDS = 60 * 60 * 24; // links stay valid for 24 h

export async function signDownload(env: Env, slug: string) {
  const exp = Math.floor(Date.now() / 1000) + DOWNLOAD_TTL_SECONDS;
  const sig = await hmac(await getOrCreateSecret(env, "download-secret"), `${slug}.${exp}`);
  return `${exp}.${sig}`;
}

export async function verifyDownload(env: Env, slug: string, token: string | null) {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!exp || !sig || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = await hmac(await getOrCreateSecret(env, "download-secret"), `${slug}.${exp}`);
  return safeEqual(sig, expected);
}

export async function saveSubmission(env: Env, kind: "contact" | "downloads", data: Record<string, unknown>) {
  const now = new Date();
  const id = `${now.toISOString().replace(/[:.]/g, "-")}-${b64url(crypto.getRandomValues(new Uint8Array(4)))}`;
  const key = `inquiries/${kind}/${id}.json`;
  await env.REPORTS.put(key, JSON.stringify({ id, kind, receivedAt: now.toISOString(), ...data }, null, 2), {
    httpMetadata: { contentType: "application/json" },
  });
  return id;
}

/* ---------------- validation ---------------- */

export type FieldRule = { max: number; required?: boolean; email?: boolean };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function clean(input: unknown, rules: Record<string, FieldRule>) {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const out: Record<string, string> = {};
  const errors: Record<string, string> = {};
  for (const [name, rule] of Object.entries(rules)) {
    const raw = typeof src[name] === "string" ? (src[name] as string).trim() : "";
    if (rule.required && !raw) errors[name] = "Required";
    else if (raw.length > rule.max) errors[name] = `Max ${rule.max} characters`;
    else if (rule.email && raw && !EMAIL.test(raw)) errors[name] = "Invalid email";
    out[name] = raw.slice(0, rule.max);
  }
  return { data: out, errors, ok: Object.keys(errors).length === 0 };
}

/** Basic bot checks: hidden honeypot field must stay empty; form must not be submitted instantly. */
export function looksLikeBot(input: unknown) {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  if (typeof src.website === "string" && src.website.trim() !== "") return true;
  const started = Number(src.startedAt);
  if (!started || Date.now() - started < 2500) return true;
  return false;
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export function clientMeta(request: Request) {
  const cf = (request as Request & { cf?: { country?: string } }).cf;
  return {
    country: cf?.country ?? null,
    userAgent: (request.headers.get("user-agent") ?? "").slice(0, 200),
  };
}
