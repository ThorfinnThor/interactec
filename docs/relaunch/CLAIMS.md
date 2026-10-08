# Relaunch — claim & sign-off list

Internal document. Scientific and comparative statements used across the relaunch are listed here with their evidence and approval status. **Nothing marked "Needs evidence" or "Needs confirmation" should go to production until a named scientist has signed it off.**

## Sales-funnel V1 status — 8 Oct 2026

The public homepage no longer uses the earlier comparative hero claims. It sells a scoped cell-cell engagement pilot and states the concrete outputs without promising an unconfirmed turnaround, lab workflow or clinical outcome. The longer method explanation lives at `/science` and also excludes the unsupported speed and endpoint-cytotoxicity comparisons below.

| Current public wording (abbreviated) | Evidence / scope | Status |
|---|---|---|
| "Compare candidates by the cell interactions they create." | Positioning statement; page scopes the offer to T-cell engagers, CAR-T and existing compatible cytometry datasets. | 🟡 confirm commercial scope |
| "Interaction map, side-by-side candidate comparison and concise decision report." | Defined pilot deliverables; no clinical or performance outcome claimed. | ❓ confirm these are the standard commercial deliverables |
| "Standard multicolour flow cytometry" | NM25 states the method can be used with multicolour fluorescence cytometers, subject to acquisition guidelines. | ✅ paper / ❓ confirm commercial workflow |
| 40-plex full-spectrum panels | 40-color single-tube full-spectrum immunophenotyping has been demonstrated on the Cytek Aurora; NM25 itself used optimized 24/25-plex assays. | 🟡 confirm InterAcTec's validated 40-plex workflow |
| 200+ cell phenotypes and functional states profiled by panel design | Commercial maximum supplied by InterAcTec; not a result reported in NM25. This is a phenotyping claim, not the number of interaction identities. | ❓ internal validation required |
| Lineage-level interaction assignment across CD4 T, CD8 T, B, NK, classical and nonclassical monocytes, cDC and pDC | Interactions are assigned using mutually exclusive lineage markers. State markers add context but do not make every state-to-state pairing an independently validated interaction identity. | 🟡 confirm the exact commercial lineage list |
| 100M+ cell events across high-scale study designs | Commercial scale target supplied by InterAcTec. NM25's largest single reported experiment contained 34,369,995 recorded cells. | ❓ internal validation required |
| 414,564 interacting cells mapped in a single published experiment | NM25 Fig. 5; one organism-wide LCMV experiment across organs and time points. The homepage does not foreground the disease model. | ✅ |
| T-cell engagers and cell therapies | Blinatumomab and anti-CD19 CAR-T demonstrations in NM25; presented as application scope, not guaranteed service outcomes. | ✅ demonstrated / ❓ confirm commercial scope |

The historical sections below remain as a record of the earlier relaunch review; red comparative claims are not part of the current public pages.

Primary source used throughout:
**[NM25]** Vonficht D, Jopp-Saile L, … Haas S. *Ultra-high-scale cytometry-based cellular interaction mapping.* Nature Methods 22(9):1887–1899 (2025). doi:10.1038/s41592-025-02744-w — open access: https://pmc.ncbi.nlm.nih.gov/articles/PMC12446065/

Secondary sources: the two case-study reports in `private/reports/` (IBD, JIA) and the previous homepage copy.

Status legend: ✅ Supported by source · 🟡 Partly supported / wording to confirm · 🔴 Needs evidence · ❓ Needs company confirmation

---

## 1. Mandated brand claims (hero, from the briefing — wording fixed)

| # | Wording | Evidence available | Comparison context | Status | Owner / sign-off |
|---|---|---|---|---|---|
| H1 | "We turn cell-cell interactions into a scalable drug-discovery readout." (changed 30 Sep 2026 from "functional cell-cell engagement" at the founders' request) | NM25 identifies *physically interacting cells* (PICs) at scale; downstream signalling (phospho-CD247) was measured inside interacting T cells, and blinatumomab-induced T–B engagement tracked clinical response in B-ALL. | "Functional" goes beyond "physical contact". NM25 supports functional relevance in specific settings (TCR signalling, drug-induced engagement), not for every detected pair. | 🟡 | |
| C1 | "Faster than imaging." | NM25 uses imaging flow cytometry only as ground truth for validation. It reports "ultra-high cellular throughput, rapid processing time and low costs" — but compared with **single-cell genomics**, not imaging. **No time comparison against microscopy/imaging is published.** | Needs a defined comparator (e.g. high-content imaging of co-cultures, imaging flow cytometry), a metric (samples/day, hands-on time, time-to-result) and in-house data. | 🔴 | |
| C2 | "More mechanistic than endpoint cytotoxicity." | NM25 resolves *which* cell-type pairs interact, their frequency over time (blinatumomab time course) and signalling state within interacting cells (pCD247). **NM25 does not compare against cytotoxicity assays.** | Must be framed as "adds information an endpoint kill readout does not contain", not as full MoA elucidation. Confirm that endpoint cytotoxicity is the comparator customers actually use. | 🔴 | |
| C3 | "Scalable on existing flow-cytometry infrastructure." | NM25: "can be used in conjunction with any multicolor fluorescence flow cytometer"; applicable to "standard flow cytometry-based assays"; re-analysis of public datasets possible "provided the data acquisition followed the guidelines". Scale: up to 34.4 M cells / 36 samples in one experiment. | The paper optimised on full-spectrum cytometry. "Any cytometer" should not be generalised to "any protocol/lab" — acquisition guidelines apply. | ✅ (paper) / ❓ confirm it holds for the commercial service | |

## 1b. Quantified comparisons (added 27 Sep 2026, extended 29 Sep 2026 with microscopy, nanowell/droplet/nanovial, high-plex imaging and spatial methods)

These compare **published instrument specifications and reported experiment sizes**. They are not a head-to-head benchmark run by InterAcTec. A same-sample benchmark would make them much stronger.

| Wording on page | Numbers | Source | Caveat | Status |
|---|---|---|---|---|
| "7–17× higher maximum acquisition rate than imaging flow cytometry" / "7× faster cell acquisition" | 35,000 events/s (Cytek Aurora) vs 5,000 obj/s (ImageStreamX Mk II, 20×) and 2,000 obj/s (40×) | Imperial College facility spec page (Aurora); Cytek ImageStream page | Maximum rates. Confirm the acquisition rate actually used for interaction mapping (doublet preservation may require slower rates) and that NM25 used an Aurora-class instrument. | 🟡 |
| "~170× more interacting cells in one experiment than in a published PIC-seq experiment" | 414,564 (NM25, LCMV) vs 2,389 PICs (Giladi et al., Nat Biotechnol 2020, in-vitro T–DC experiment) | NM25; doi:10.1038/s41587-020-0442-2 | Different biological systems; PIC-seq profiles whole transcriptomes, Interact-omics a cytometry panel. | 🟡 |
| "52 vs 1: cell-type pairs resolved in one experiment, versus one outcome per well" | 52 cell-type pairs (NM25, LCMV) | NM25 | Kill assays can be multiplexed; "one outcome per well" describes a classic endpoint readout. | 🟡 |
| "Costs orders of magnitude below single-cell genomics" | — | NM25 Discussion (verbatim claim of the authors) | No absolute cost figures published. | ✅ as attributed quote |
| "Hours, not days" (at-a-glance + 01) | InterAcTec: 0.5–3 h co-culture (NM25 Methods, CAR-T). Xenium: "2–3 days sample prep" + "< 3 days" run (480 genes) / "< 6 days" (5,000 genes) | NM25; 10x Xenium Analyzer page | Compares co-culture time with prep + run time; staining/acquisition add to ours, image analysis to theirs. Labelled as "as reported", not a benchmark. | 🟡 |
| Acquisition bar "High-plex tissue imaging ~1,700 cells/s" | "imaging 1 million cells in 10 minutes" | Akoya PhenoCycler-Fusion spec sheet | Vendor figure per imaging pass; repeated per marker cycle. | 🟡 |
| Time chart | TIMING: imaging "every 5 minutes" for "6 hours" (Romain et al., JCI 2022); "1–2 TB of data" per experiment (Lu et al., Bioinformatics 2019). Droplets: "monitored over 10 h" (Sci Rep 2021, s41598-021-96609-9). PhenoCycler: "approximately 6–26 h run time" (STAR Protocols 2024) | as listed | Different steps reported by each method. | 🟡 |
| Interactions bar (03) | 414,564 (NM25) vs 2,389 (PIC-seq) vs ~2,000 1:1 droplet pairs (Sci Rep 2021) vs 1,589 T cells (Romain et al., JCI 2022, 5 axi-cel products) | as listed | TIMING arrays hold up to 200,000 nanowells/experiment (Lu 2019) — noted under the chart. | 🟡 |
| Readout schematic: contact / proximity / outcome | Spatial methods infer interactions from co-expression / proximity (Armingol et al., Nat Rev Genet 2021); "transient cellular interactions … in the blood … cannot be studied using spatial technologies" (NM25) | Armingol 2021; NM25 | Schematic, labelled. | ✅ |
| Method matrix (9 methods in 4 groups) | ImageStreamX 5,000/2,000 obj/s; TIMING / Beacon ("500 to 60,000 single cells", up to 4 chips); droplets ~2,000 pairs, 10 h; nanovials ">1 million events in <1 h" (de Rutte, ACS Nano 2022); PhenoCycler "up to 100+ biomarkers", ~380,000 cells in STAR Protocols dataset, 6–26 h; COMET "40-plex … in less than 24 h" (Rivest, Sci Rep 2023); Xenium 480–5,000 genes, prep + run as above; PIC-seq 2,389 | as listed | Simplified; examples named for orientation. Nanovial quote and CosMx numbers could not be re-checked directly (Europe PMC rate limit) — CosMx shown without numbers. | 🟡 review with scientists |

Evidence section now shows four fields (Oncology, Immunology, Autoimmunity, Infectious disease). "37.8 M cells across two case studies" = 29.9 M (IBD) + 7.8 M (JIA). IBD is filed under Autoimmunity as an immune-mediated inflammatory disease — confirm this framing.

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
| Workflow | Define decision and cell system → agree acquisition or re-analysis plan → map and compare engagement. No reagents, turnaround or lab ownership claimed. | NM25 + deliberately bounded commercial wording | ❓ confirm who acquires, who analyses and the turnaround |
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
- Contact address hello@interactec.bio and the feasibility form are the primary contact routes. Form submissions are validated and stored in the existing Cloudflare R2 binding.
- No team / founder / address / legal-entity information in the repo → no "About" or "Team" section, no Imprint. **A German company needs an Impressum before production launch.**
- `/og.png` was referenced but did not exist; replaced by a generated Open Graph image.
- Note: `/api/download/{ibd,arthritis}` serves the PDFs without checking the Tally form — the email gate is advisory only.
