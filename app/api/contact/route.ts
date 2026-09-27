import { clean, clientMeta, getEnv, json, looksLikeBot, saveSubmission } from "@/lib/server/store";

const RULES = {
  name: { max: 120, required: true },
  email: { max: 200, required: true, email: true },
  company: { max: 160, required: true },
  role: { max: 120 },
  modality: { max: 120 },
  message: { max: 4000, required: true },
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }
  if (looksLikeBot(body)) return json({ ok: false, error: "Please try again." }, 400);
  const consent = (body as Record<string, unknown>)?.consent === true;
  const { data, errors, ok } = clean(body, RULES);
  if (!consent) errors.consent = "Required";
  if (!ok || !consent) return json({ ok: false, errors }, 422);

  const env = await getEnv();
  if (!env) return json({ ok: false, error: "Storage is not available in this environment." }, 503);
  try {
    const id = await saveSubmission(env, "contact", { ...data, consent: true, ...clientMeta(request) });
    return json({ ok: true, id });
  } catch {
    return json({ ok: false, error: "We could not save your message. Please email us instead." }, 500);
  }
}
