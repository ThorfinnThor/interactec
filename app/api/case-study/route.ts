import { caseStudyBySlug } from "@/lib/case-studies";
import { clean, clientMeta, getEnv, json, looksLikeBot, saveSubmission, signDownload } from "@/lib/server/store";

const RULES = {
  caseStudy: { max: 40, required: true },
  name: { max: 120, required: true },
  email: { max: 200, required: true, email: true },
  company: { max: 160, required: true },
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }
  if (looksLikeBot(body)) return json({ ok: false, error: "Please try again." }, 400);
  const b = body as Record<string, unknown>;
  const consent = b?.consent === true;
  const updates = b?.updates === true;
  const { data, errors, ok } = clean(body, RULES);
  const study = caseStudyBySlug(data.caseStudy);
  if (!study) errors.caseStudy = "Unknown case study";
  if (!consent) errors.consent = "Required";
  if (!ok || !consent || !study) return json({ ok: false, errors }, 422);

  const env = await getEnv();
  if (!env) return json({ ok: false, error: "Downloads are not available in this environment." }, 503);
  try {
    await saveSubmission(env, "downloads", { ...data, consent: true, updates, ...clientMeta(request) });
    const token = await signDownload(env, study.slug);
    return json({ ok: true, url: `/api/download/${study.slug}?t=${encodeURIComponent(token)}` });
  } catch {
    return json({ ok: false, error: "Something went wrong. Please try again or email us." }, 500);
  }
}
