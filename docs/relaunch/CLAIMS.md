# Relaunch — claim & sign-off list

Internal document. Every scientific or comparative statement on the relaunched homepage is listed here with its evidence and approval status. **Nothing marked "Needs evidence" or "Needs confirmation" should go to production until a named scientist has signed it off.**

Primary source used throughout:
**[NM25]** Vonficht D, Jopp-Saile L, … Haas S. *Ultra-high-scale cytometry-based cellular interaction mapping.* Nature Methods 22(9):1887–1899 (2025). doi:10.1038/s41592-025-02744-w — open access: https://pmc.ncbi.nlm.nih.gov/articles/PMC12446065/

Secondary sources: the two case-study reports in `private/reports/` (IBD, JIA) and the previous homepage copy.

Status legend: ✅ Supported by source · 🟡 Partly supported / wording to confirm · 🔴 Needs evidence · ❓ Needs company confirmation

---

## 1. Mandated brand claims (hero, from the briefing — wording fixed)

| # | Wording | Evidence available | Comparison context | Status | Owner / sign-off |
|---|---|---|---|---|---|
| H1 | "We turn functional cell-cell engagement into a scalable drug-discovery readout." | NM25 identifies *physically interacting cells* (PICs) at scale; downstream signalling (phospho-CD247) was measured inside interacting T cells, and blinatumomab-induced T–B engagement tracked clinical response in B-ALL. | "Functional" goes beyond "physical contact". NM25 supports functional relevance in specific settings (TCR signalling, drug-induced engagement), not for every detected pair. | 🟡 | |
| C1 | "Faster than imaging." | NM25 uses imaging flow cytometry only as ground truth for validation. It reports "ultra-high cellular throughput, rapid processing time and low costs" — but compared with **single-cell genomics**, not imaging. **No time comparison against microscopy/imaging is published.** | Needs a defined comparator (e.g. high-content imaging of co-cultures, imaging flow cytometry), a metric (samples/day, hands-on time, time-to-result) and in-house data. | 🔴 | |
| C2 | "More mechanistic than endpoint cytotoxicity." | NM25 resolves *which* cell-type pairs interact, their frequency over time (blinatumomab time course) and signalling state within interacting cells (pCD247). **NM25 does not compare against cytotoxicity assays.** | Must be framed as "adds information an endpoint kill readout does not contain", not as full MoA elucidation. Confirm that endpoint cytotoxicity is the comparator customers actually use. | 🔴 | |
| C3 | "Scalable on existing flow-cytometry infrastructure." | NM25: "can be used in conjunction with any multicolor fluorescence flow cytometer"; applicable to "standard flow cytometry-based assays"; re-analysis of public datasets possible "provided the data acquisition followed the guidelines". Scale: up to 34.4 M cells / 36 samples in one experiment. | The paper optimised on full-spectrum cytometry. "Any cytometer" should not be generalised to "any protocol/lab" — acquisition guidelines apply. | ✅ (paper) / ❓ confirm it holds for the commercial service | |

## 2. Supporting statements used on the page

| Section | Wording (abbreviated) | Source | Status |
|---|---|---|---|
| Science | Conjugates of two cells pass the cytometer as one event and are normally gated out as doublets; the method treats them as signal. | NM25 (FSC-A/FSC-H ratio + clustering + co-expression of mutually exclusive lineage markers) | ✅ |
| Science | Identification via scatter ratio and co-expression of mutually exclusive markers. | NM25 methods | ✅ |
| Story ch. 2 | "Proximity is not engagement." — page distinguishes chance contact from the conceptual focus; no mechanism invented. | Framing; NM25 notes reliance on "carefully chosen case-control settings with stable experimental conditions". | 🟡 confirm wording |
| Story ch. 3 | Interaction becomes a countable event in the data. Explicitly marked as visual metaphor. | NM25 | ✅ |
| Story ch. 4 | Interaction frequencies can be compared across conditions (treatments, timepoints, donors). Chart labelled "Illustrative data — not experimental results". | NM25 (time courses, responders vs non-responders, infection time points) | ✅ |
| Differentiator 1 | Workflow graphic imaging vs cytometry — no timings, no bars. Footnote cites throughput numbers from NM25 only. | NM25 | ✅ graphic / 🔴 headline (C1) |
| Differentiator 2 | pCD247 measured within interacting T cells; engagement resolved over time. | NM25 | ✅ |
| Differentiator 3 | Works with multicolour fluorescence cytometers; public datasets re-analysed. | NM25 | ✅ |
| Workflow | Prepare suspension → acquire on cytometer following guidelines → map interactions (PICtR) → compare. No reagents, times or automation claimed. | NM25 | ❓ confirm this is the actual service workflow (who acquires? who analyses? turnaround?) |
| Applications | T-cell engagers (blinatumomab, CD3×CD19), CAR-T (anti-CD19), antigen-specific T cell–APC engagement. | NM25 demonstrations | ✅ demonstrated in paper / ❓ confirm offered as service |
| Translational | B-ALL cohort, 42 paediatric patients: blinatumomab-induced T–B interactions stronger in good responders; high T–myeloid interactions at baseline associated with therapy failure. | NM25 | ✅ (retrospective association, not a validated predictive test) |
| Translational | IBD case study: PBMCs from HC n=11, UC n=9, CD n=11; 29.9 M cells; 362,102 interacting cells. | Report 1 | ✅ |
| Translational | JIA case study: public spectral data; 7.8 M cells; 12,908 interacting cells; HD n=18 vs JIA n=36. | Report 2 | ✅ |
| Translational | Retrospective datasets can be re-analysed. | NM25 | ✅ with acquisition caveat |
| Evidence table | Cells analysed / interacting cells per experiment. | NM25 figures (see page) | ✅ transcribe-check before launch |

## 3. Claims from the old site that were **removed** pending evidence

| Old wording | Why removed |
|---|---|
| "Clinical-ready cytometry analytics", "Clinical workflow ready" | No clinical validation / regulatory status documented. |
| "Low cost", "High precision" (as badges) | NM25 compares cost only against single-cell genomics; no precision metric vs comparator defined. |
| "Predict responders before treatment", "Biomarkers & CDx" | NM25 shows a retrospective association in one cohort; no validated predictive/companion diagnostic. |
| "AI-assisted analysis" | NM25 describes clustering (Louvain) and a computational toolkit (PICtR); "AI" is not substantiated. |
| "De-risk safety", "off-target interaction patterns" | Not demonstrated in NM25 or case studies. |
| Disease-area tiles (oncology, autoimmune, inflammatory, infectious) | Replaced by concrete, sourced examples (B-ALL, IBD, JIA, LCMV). |

## 4. Company facts to confirm (❓)

- Brand spelling: **InterAcTec** (used on page) vs "Interactec" (briefing).
- Relationship to the Nature Methods authors / DKFZ (spin-off? licence?). The page currently says "built on Interact-omics, published in Nature Methods" and does **not** claim authorship or affiliation.
- Contact address hello@interactec.bio is the only contact route (mailto). No form backend exists.
- No team / founder / address / legal-entity information in the repo → no "About" or "Team" section, no Imprint. **A German company needs an Impressum before production launch.**
- `/og.png` was referenced but did not exist; replaced by a generated Open Graph image.
- Note: `/api/download/{ibd,arthritis}` serves the PDFs without checking the Tally form — the email gate is advisory only.
