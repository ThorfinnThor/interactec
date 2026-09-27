import { getEnv, getOrCreateSecret, json } from "@/lib/server/store";

/** Lists stored submissions for the /admin inbox. Requires the admin key stored in R2 (config/admin-key). */
export async function GET(request: Request) {
  const env = await getEnv();
  if (!env) return json({ ok: false, error: "Not available in this environment." }, 503);

  const auth = request.headers.get("authorization") ?? "";
  const given = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  const expected = await getOrCreateSecret(env, "admin-key");
  if (!given || given.length !== expected.length || given !== expected) {
    await new Promise((r) => setTimeout(r, 400));
    return json({ ok: false, error: "Invalid key." }, 401);
  }

  const keys: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await env.REPORTS.list({ prefix: "inquiries/", cursor, limit: 1000 });
    keys.push(...page.objects.map((o) => o.key));
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor && keys.length < 5000);

  keys.sort().reverse();
  const items: unknown[] = [];
  for (let i = 0; i < Math.min(keys.length, 500); i += 25) {
    const batch = await Promise.all(
      keys.slice(i, i + 25).map(async (k) => {
        const o = await env.REPORTS.get(k);
        try {
          return o ? JSON.parse(await o.text()) : null;
        } catch {
          return null;
        }
      }),
    );
    items.push(...batch.filter(Boolean));
  }
  return json({ ok: true, total: keys.length, items });
}
