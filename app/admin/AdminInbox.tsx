"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

type Item = {
  id: string;
  kind: "contact" | "downloads";
  receivedAt: string;
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  modality?: string;
  message?: string;
  caseStudy?: string;
  updates?: boolean;
  country?: string | null;
};

const STORAGE_KEY = "ia-admin-key";

function toCsv(items: Item[]) {
  const cols: (keyof Item)[] = ["receivedAt", "kind", "name", "email", "company", "role", "modality", "caseStudy", "updates", "country", "message"];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(","), ...items.map((it) => cols.map((c) => esc(it[c])).join(","))].join("\n");
}

export default function AdminInbox() {
  const [key, setKey] = useState("");
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "contact" | "downloads" | "newsletter">("all");
  const [open, setOpen] = useState<string | null>(null);

  async function load(k: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/inquiries", { headers: { Authorization: `Bearer ${k}` }, cache: "no-store" });
      const data = (await res.json()) as { ok?: boolean; error?: string; items?: Item[] };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not load.");
      setItems(data.items ?? []);
      try {
        sessionStorage.setItem(STORAGE_KEY, k);
      } catch {
        /* ignore */
      }
    } catch (e) {
      setItems(null);
      setError(e instanceof Error ? e.message : "Could not load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let saved = "";
    try {
      saved = sessionStorage.getItem(STORAGE_KEY) ?? "";
    } catch {
      /* ignore */
    }
    if (saved) {
      queueMicrotask(() => {
        setKey(saved);
        void load(saved);
      });
    }
  }, []);

  const shown = useMemo(
    () =>
      (items ?? []).filter((i) =>
        filter === "all" ? true : filter === "newsletter" ? i.kind === "downloads" && i.updates === true : i.kind === filter,
      ),
    [items, filter],
  );
  const newsletterCount = (items ?? []).filter((i) => i.kind === "downloads" && i.updates === true).length;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void load(key.trim());
  }

  function exportCsv() {
    const blob = new Blob([toCsv(shown)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `interactec-inbox-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <main className="min-h-screen bg-paper px-4 py-10 text-ink sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-medium tracking-tight">InterAcTec inbox</h1>
        <p className="mt-2 text-[15px] text-ink/65">Contact requests and case-study downloads stored in Cloudflare R2.</p>

        {!items && (
          <form onSubmit={onSubmit} className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="admin-key">
              Admin key
            </label>
            <input
              id="admin-key"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Admin key"
              className="h-12 flex-1 rounded-xl border border-ink/20 bg-white px-4"
              autoComplete="current-password"
            />
            <button className="h-12 rounded-full bg-ink px-6 text-paper disabled:opacity-60" disabled={loading || !key}>
              {loading ? "Loading…" : "Open"}
            </button>
          </form>
        )}
        {error && <p className="mt-4 text-[#b42318]">{error}</p>}

        {items && (
          <>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {(["all", "contact", "downloads", "newsletter"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`h-10 rounded-full border px-4 text-[14px] ${filter === f ? "border-ink bg-ink text-paper" : "border-ink/20"}`}
                >
                  {f === "all"
                    ? `All (${items.length})`
                    : f === "contact"
                      ? "Contact"
                      : f === "downloads"
                        ? "Downloads"
                        : `Newsletter opt-ins (${newsletterCount})`}
                </button>
              ))}
              <button onClick={() => void load(key)} className="h-10 rounded-full border border-ink/20 px-4 text-[14px]">
                Refresh
              </button>
              <button onClick={exportCsv} className="h-10 rounded-full border border-ink/20 px-4 text-[14px]">
                Export CSV
              </button>
            </div>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/12 bg-white">
              <table className="w-full min-w-[800px] text-left text-[14px]">
                <thead className="border-b border-ink/12 text-ink/60">
                  <tr>
                    <th className="px-4 py-3 font-normal">Received</th>
                    <th className="px-4 py-3 font-normal">Type</th>
                    <th className="px-4 py-3 font-normal">Name</th>
                    <th className="px-4 py-3 font-normal">Email</th>
                    <th className="px-4 py-3 font-normal">Company</th>
                    <th className="px-4 py-3 font-normal">Topic</th>
                    <th className="px-4 py-3 font-normal">Newsletter</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-ink/55">
                        Nothing yet.
                      </td>
                    </tr>
                  )}
                  {shown.map((it) => (
                    <FragmentRow key={it.id} it={it} open={open === it.id} onToggle={() => setOpen(open === it.id ? null : it.id)} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function FragmentRow({ it, open, onToggle }: { it: Item; open: boolean; onToggle: () => void }) {
  return (
    <>
      <tr className="cursor-pointer border-b border-ink/8 hover:bg-paper" onClick={onToggle}>
        <td className="px-4 py-3 tabular-nums">{new Date(it.receivedAt).toLocaleString()}</td>
        <td className="px-4 py-3">{it.kind === "contact" ? "Contact" : "Download"}</td>
        <td className="px-4 py-3">{it.name}</td>
        <td className="px-4 py-3">
          <a href={`mailto:${it.email}`} className="underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
            {it.email}
          </a>
        </td>
        <td className="px-4 py-3">{it.company}</td>
        <td className="px-4 py-3">{it.kind === "contact" ? it.modality || "—" : it.caseStudy}</td>
        <td className="px-4 py-3">{it.kind === "downloads" ? (it.updates ? "Yes" : "No") : "—"}</td>
      </tr>
      {open && (
        <tr className="border-b border-ink/8 bg-paper/60">
          <td colSpan={7} className="px-4 py-4 text-[14px] leading-relaxed">
            {it.role && <p>Role: {it.role}</p>}
            {it.message && <p className="whitespace-pre-wrap">{it.message}</p>}
            {it.kind === "downloads" && <p>Wants updates: {it.updates ? "yes" : "no"}</p>}
            <p className="mt-2 text-ink/55">Country: {it.country ?? "—"}</p>
          </td>
        </tr>
      )}
    </>
  );
}
