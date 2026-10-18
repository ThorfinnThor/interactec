export type InsightSource = {
  label: string;
  title: string;
  publication: string;
  url: string;
};

export type InsightSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  note?: {
    label: string;
    title: string;
    text: string;
  };
};

export type Insight = {
  slug: string;
  category: "Measurement" | "Immunotherapy" | "Data feasibility" | "Panel design";
  title: string;
  shortTitle: string;
  description: string;
  answer: string;
  published: string;
  updated: string;
  readTime: string;
  author: string;
  authorRole: string;
  visual: "doublets" | "engagement" | "fcs" | "panel";
  highlights: string[];
  sections: InsightSection[];
  sources: InsightSource[];
  relatedSlugs: string[];
};

const INTERACTOMICS_SOURCE: InsightSource = {
  label: "01",
  title: "Ultra-high-scale cytometry-based cellular interaction mapping",
  publication: "Nature Methods 22, 1887–1899 (2025)",
  url: "https://doi.org/10.1038/s41592-025-02744-w",
};

const OMIP_069_SOURCE: InsightSource = {
  label: "02",
  title: "OMIP-069: Forty-Color Full Spectrum Flow Cytometry Panel for Deep Immunophenotyping of Major Cell Subsets in Human Peripheral Blood",
  publication: "Cytometry Part A 97, 1044–1051 (2020)",
  url: "https://pubmed.ncbi.nlm.nih.gov/32830910/",
};

export const INSIGHTS: Insight[] = [
  {
    slug: "flow-cytometry-doublet-exclusion-cell-interactions",
    category: "Measurement",
    title: "Cell–cell interaction analysis by flow cytometry: what conventional doublet exclusion can miss",
    shortTitle: "What doublet exclusion can miss",
    description:
      "Why some flow-cytometry multiplets carry biological information, how physical cell interactions can be separated from technical aggregates and where the readout adds value.",
    answer:
      "Conventional flow-cytometry workflows remove multiplets to protect single-cell analysis. For a cell–cell interaction study, a defined subset of those events becomes the readout: physically associated cells identified through scatter features, mutually exclusive lineage markers and controlled condition-to-condition enrichment.",
    published: "2026-10-18",
    updated: "2026-10-18",
    readTime: "7 min read",
    author: "Schayan Yousefian",
    authorRole: "Scientific Lead, InterAcTec",
    visual: "doublets",
    highlights: [
      "Multiplets are not automatically biological interactions; controls and stable processing are essential.",
      "Scatter characteristics and mutually exclusive lineage markers make heterotypic pairs assignable.",
      "The useful signal is the reproducible enrichment of defined interaction types across matched conditions.",
    ],
    sections: [
      {
        heading: "Why doublets are usually excluded",
        paragraphs: [
          "Flow cytometry is commonly analysed as a single-cell measurement. Two cells passing the laser together can combine their scatter and fluorescence signals, distort population boundaries and bias estimates of marker expression. Singlet gates therefore remove events with multiplet-like pulse geometry before cell populations are quantified.",
          "That logic is correct for a conventional single-cell endpoint. It becomes incomplete when the biological question is whether two cell types physically engage. In that setting, removing every multiplet before analysis also removes the event class that contains the interaction signal.",
        ],
      },
      {
        heading: "When a multiplet becomes an interaction readout",
        paragraphs: [
          "A useful interaction event is not defined by size alone. The published Interact-omics framework combines forward- and side-scatter information, the forward-scatter ratio and the co-expression of markers that normally belong to mutually exclusive cell lineages. A CD3-positive and CD19-positive event, for example, can represent an associated T cell and B cell when the full marker and scatter context supports that assignment.",
          "The analysis first maps the overall cellular landscape without discarding multiplets. Clusters enriched for multiplet-like scatter features and coherent combinations of lineage markers are then selected, annotated and quantified as physically interacting cell populations.",
        ],
        note: {
          label: "Core distinction",
          title: "Multiplet detection is necessary, but not sufficient.",
          text: "Interaction identity comes from the joint evidence of pulse geometry, lineage-marker combinations, cluster context and condition-specific enrichment.",
        },
      },
      {
        heading: "How biological signal is separated from technical contact",
        paragraphs: [
          "Cells can associate during biology, sample preparation or acquisition. A defensible experiment is therefore designed around matched controls rather than an absolute interaction count. Samples from all experimental groups should be processed uniformly, with stable cell concentrations, handling times and cytometer settings.",
          "The Nature Methods study recommends reporting relative enrichment against controls. Lower cell concentrations and slower flow rates can help reduce technical associations, while early fixation can stabilize interactions. In in-vivo studies, organs or samples should not be pooled before processing because cells brought together after collection may form new contacts.",
        ],
        bullets: [
          "Use matched case–control or treatment–control conditions.",
          "Keep cell concentration, processing time and flow rate consistent.",
          "Preserve the scatter parameters needed to distinguish multiplet-rich clusters.",
          "Use mutually exclusive lineage markers to assign heterotypic pairs.",
          "Interpret enrichment over background, not every detected pair as a true in-vivo contact.",
        ],
      },
      {
        heading: "What this readout adds — and what it does not",
        paragraphs: [
          "Interaction mapping can show which lineages engage, how frequently they engage and how those frequencies change across a candidate, dose, donor or time point. State and signalling markers can add context inside the participating cells. In the published work, phosphorylated CD247 was measured in interacting T cells after crosslinking stimuli.",
          "The readout does not by itself prove causality, synapse quality, killing or a complete mechanism of action. It measures physical association under the defined experimental conditions. Imaging, functional assays or single-cell genomics can remain valuable complementary methods when morphology, outcome or transcriptomic depth is the primary question.",
        ],
      },
      {
        heading: "When to consider an interaction-first analysis",
        paragraphs: [
          "The approach is most informative when the intervention is expected to redirect cellular contact: bispecific T-cell engagers, CAR-T cells, antigen-specific stimulation or other cell-bridging modalities. It is also useful when two candidates produce similar endpoint effects but may recruit different cell lineages or differ in engagement kinetics.",
          "The practical starting point is a feasibility review of the panel, sample system, controls and acquisition plan. That review determines whether an interaction readout can answer the decision at hand before a full pilot is scoped.",
        ],
      },
    ],
    sources: [INTERACTOMICS_SOURCE],
    relatedSlugs: [
      "compare-t-cell-engager-candidates",
      "existing-fcs-files-cell-interaction-analysis",
    ],
  },
  {
    slug: "compare-t-cell-engager-candidates",
    category: "Immunotherapy",
    title: "How to compare T-cell engager candidates using cellular engagement maps",
    shortTitle: "Comparing T-cell engager candidates",
    description:
      "A practical framework for comparing T-cell engager candidates across interaction identity, magnitude, kinetics and donor context using flow-cytometry engagement maps.",
    answer:
      "A cellular engagement map compares candidates by the lineage pairs they induce, the magnitude and timing of those interactions, and the phenotypic or signalling context of the participating cells. It complements endpoint assays by revealing who engaged whom before the final outcome is measured.",
    published: "2026-10-18",
    updated: "2026-10-18",
    readTime: "8 min read",
    author: "Schayan Yousefian",
    authorRole: "Scientific Lead, InterAcTec",
    visual: "engagement",
    highlights: [
      "Compare the interaction landscape, not only a single target-pair frequency.",
      "Time, dose and donor are experimental dimensions—not afterthoughts.",
      "Normalize interaction frequencies when the abundance of the participating lineages changes.",
    ],
    sections: [
      {
        heading: "The decision is larger than target engagement",
        paragraphs: [
          "A T-cell engager is designed to bring an effector cell and a target cell together. Measuring that intended pair is necessary, but it may not be sufficient to differentiate candidates. A useful comparison also asks which T-cell subsets participate, whether other immune lineages enter the interaction landscape, how quickly engagement peaks and whether the pattern is consistent across donors.",
          "A cellular engagement map turns these questions into a structured readout. Each candidate is represented by the set of lineage-level interactions it changes relative to its matched control, together with their magnitude, kinetics and cellular context.",
        ],
      },
      {
        heading: "Four dimensions for candidate comparison",
        paragraphs: [
          "The study design should be built around the decision that follows. A lead-selection experiment may prioritize separation between candidates, while a dose or format experiment may focus on the shape and persistence of the response. The same four dimensions provide a useful backbone.",
        ],
        bullets: [
          "Identity: which effector–target and bystander lineage pairs are enriched?",
          "Magnitude: how strongly does each interaction change relative to control?",
          "Kinetics: when does engagement peak, persist or decline?",
          "Context: how do donor composition, cell state and signalling features change the pattern?",
        ],
        note: {
          label: "Design principle",
          title: "Start with the decision, then select the conditions.",
          text: "A compact candidate × dose × time design with adequate controls is often more informative than a broad screen with insufficient replication.",
        },
      },
      {
        heading: "What the published blinatumomab experiment demonstrates",
        paragraphs: [
          "In the Nature Methods study, human PBMCs were treated ex vivo with the CD3×CD19 T-cell engager blinatumomab. The dataset contained 985,735 recorded cells, and the interacting-cell landscape comprised 34,362 events. B–T interactions increased rapidly, peaked at one hour and then declined over time, while interactions not expected from the compound’s targeting logic remained comparatively stable.",
          "The study also analysed ex-vivo-treated bone-marrow samples from 42 paediatric patients with relapsed B-ALL. Interaction features differed between clearly classified good responders and nonresponders, and added information beyond correlated singlet population frequencies. This was a retrospective research analysis, not a clinically validated predictive test.",
        ],
      },
      {
        heading: "Normalize for the cells that are available to interact",
        paragraphs: [
          "Raw interaction counts can change simply because one contributing cell population expands, contracts or differs between donors. The published framework therefore supports multiple views: interactions as a fraction of all high-quality events, composition within the interaction compartment, and enrichment relative to the expected frequency based on the contributing singlet populations.",
          "For unbalanced or rapidly changing populations, normalization using the harmonic mean of the participating singlet frequencies helps distinguish a change in engagement propensity from a change in cell availability. The chosen normalization should match the biological question and be specified before candidate ranking.",
        ],
      },
      {
        heading: "A decision-ready output",
        paragraphs: [
          "A useful comparison should end with more than a UMAP. The decision package should show a lineage-by-lineage interaction map, candidate effect sizes versus matched controls, kinetics for the interactions that separate candidates, donor consistency and the limitations of the design.",
          "The result can then support a concrete next step: prioritize a candidate, refine a dose range, select an informative time point or decide which functional assay should follow. Cellular engagement is an additional decision layer—not a replacement for cytotoxicity, cytokine or safety assays.",
        ],
      },
    ],
    sources: [INTERACTOMICS_SOURCE],
    relatedSlugs: [
      "flow-cytometry-doublet-exclusion-cell-interactions",
      "designing-40-plex-lineage-interaction-panel",
    ],
  },
  {
    slug: "existing-fcs-files-cell-interaction-analysis",
    category: "Data feasibility",
    title: "Can existing FCS files be re-analysed for cell–cell interactions?",
    shortTitle: "Re-analysing existing FCS files",
    description:
      "A feasibility checklist for determining whether existing flow-cytometry FCS files preserve enough information for retrospective cell–cell interaction analysis.",
    answer:
      "Yes—some existing FCS datasets can be re-analysed for physical cell interactions. Feasibility depends on whether multiplets were retained during acquisition and export, whether the required scatter and lineage-marker channels are present, and whether samples and controls were processed consistently.",
    published: "2026-10-18",
    updated: "2026-10-18",
    readTime: "6 min read",
    author: "Schayan Yousefian",
    authorRole: "Scientific Lead, InterAcTec",
    visual: "fcs",
    highlights: [
      "Analysis cannot recover events that were physically excluded during acquisition or removed before export.",
      "FSC-A and FSC-H, lineage markers, viability information and matched controls materially improve feasibility.",
      "A file-level review should happen before biological interpretation or a full retrospective project is scoped.",
    ],
    sections: [
      {
        heading: "Retrospective analysis is possible—but not automatic",
        paragraphs: [
          "The published Interact-omics study re-analysed two public cytometry datasets, including a juvenile idiopathic arthritis dataset and a dataset from murine proximal intestine. The examples show that interaction information can be mined after acquisition when the original experiment preserved the relevant events and parameters.",
          "An FCS file is not automatically suitable just because it contains many markers. The key question is whether the acquisition and export retained multiplet-rich events, the scatter geometry needed to identify them and enough lineage information to assign heterotypic pairs.",
        ],
      },
      {
        heading: "The five-part feasibility check",
        paragraphs: [
          "A useful first review combines the raw files with the experiment’s metadata. The following five areas determine whether the dataset can support the intended interaction question.",
        ],
        bullets: [
          "Event preservation: multiplets were not excluded by a restrictive acquisition gate or removed before export.",
          "Scatter geometry: area and height parameters—especially FSC-A and FSC-H—are present and usable.",
          "Lineage resolution: the panel contains mutually informative markers for the cell types expected to interact.",
          "Quality and controls: viability, compensation or unmixing, control conditions and sample annotations are available.",
          "Experimental consistency: concentration, processing, acquisition settings and flow rate are comparable across groups.",
        ],
      },
      {
        heading: "What cannot be repaired computationally",
        paragraphs: [
          "If the cytometer never recorded the relevant events, no downstream algorithm can reconstruct them. The same is true when an exported file contains only a pre-gated singlet population, or when critical scatter channels were omitted. A panel that cannot distinguish the two contributing lineages may detect multiplets without allowing a defensible interaction assignment.",
          "Missing controls are another hard limitation. Without a matched baseline, technical association and treatment-induced enrichment can be difficult to separate. Retrospective exploration may still generate a hypothesis, but it should not be presented with the confidence of a prospectively controlled study.",
        ],
        note: {
          label: "Fastest answer",
          title: "Review representative raw files before reviewing every sample.",
          text: "A small set spanning control, treatment and different acquisition days can reveal whether the essential event structure and parameters are present.",
        },
      },
      {
        heading: "What a feasibility review should inspect",
        paragraphs: [
          "At file level, the review checks channel names, parameter ranges, event counts, acquisition-time stability, scatter distributions, compensation or unmixing state and whether multiplet-like populations remain. At study level, it checks the sample map, control logic, batch structure and whether the biological comparison is identifiable from the available conditions.",
          "The output should be a bounded recommendation: suitable for the intended question, suitable with reduced resolution, exploratory only, or not suitable. It should also state which interaction lineages can realistically be assigned and which claims the data cannot support.",
        ],
      },
      {
        heading: "When prospective data are the better choice",
        paragraphs: [
          "New acquisition is preferable when the existing panel lacks lineage markers, multiplets were discarded, key controls are absent or technical variation is confounded with the biological groups. A prospective design can place lineage-defining markers on channels with lower spreading error, standardize processing and include time, dose and control conditions around the decision.",
          "Existing files are therefore best treated as an opportunity, not an assumption. A focused feasibility check can prevent an uninformative re-analysis—and can also identify datasets that already contain an underused interaction readout.",
        ],
      },
    ],
    sources: [INTERACTOMICS_SOURCE],
    relatedSlugs: [
      "flow-cytometry-doublet-exclusion-cell-interactions",
      "designing-40-plex-lineage-interaction-panel",
    ],
  },
  {
    slug: "designing-40-plex-lineage-interaction-panel",
    category: "Panel design",
    title: "Designing a 40-plex panel for lineage-resolved interaction mapping",
    shortTitle: "Designing a 40-plex interaction panel",
    description:
      "How to allocate a 40-plex spectral flow panel across lineage identity, interaction assignment and cell-state context without confusing phenotypic states with validated interaction types.",
    answer:
      "A 40-plex interaction panel should first secure robust lineage assignment for both cells in a heterotypic event, then add state and functional markers that provide context. Lineage resolution determines the interaction type; state markers describe the cells participating in that interaction.",
    published: "2026-10-18",
    updated: "2026-10-18",
    readTime: "8 min read",
    author: "Schayan Yousefian",
    authorRole: "Scientific Lead, InterAcTec",
    visual: "panel",
    highlights: [
      "Protect lineage-defining markers before allocating channels to exploratory state markers.",
      "Place mutually exclusive lineage markers where spreading error is least likely to obscure co-expression.",
      "Report interaction identity at the validated lineage level; use phenotypic states as context.",
    ],
    sections: [
      {
        heading: "A 40-plex interaction panel has two jobs",
        paragraphs: [
          "High-parameter spectral flow cytometry can profile major innate and adaptive immune populations in one tube. OMIP-069 demonstrated a 40-colour panel for deep immunophenotyping of human peripheral blood, including CD4 T, CD8 T, regulatory and γδ T cells, B cells, NK cells, monocytes and dendritic cells, together with activation and differentiation markers.",
          "An interaction panel must do more than phenotype singlets. It must also retain enough orthogonal lineage information to assign the combined signal of two associated cells. That changes marker priority, fluorophore placement and validation strategy.",
        ],
      },
      {
        heading: "Layer 1: establish lineage identity",
        paragraphs: [
          "The first layer identifies the major immune lineages expected in the sample: for example CD4 T, CD8 T, B, NK, classical and nonclassical monocytes, conventional dendritic cells and plasmacytoid dendritic cells. Redundant or complementary identity markers can improve robustness when an event contains signal from two cells rather than one.",
          "Mutually exclusive lineage markers carry special value because their co-expression can identify a heterotypic pair. The published framework therefore assigned cell-type-specific markers to fluorophores with low spectral overlap to reduce spreading errors where interaction identity depends on simultaneous detection.",
        ],
      },
      {
        heading: "Layer 2: add cell-state and functional context",
        paragraphs: [
          "Once lineage assignment is protected, remaining channels can describe activation, differentiation, exhaustion, trafficking or intracellular signalling. These markers can reveal whether the participating T cells are naïve, memory-like or activated, or whether signalling is enriched inside a defined interaction population.",
          "This distinction matters in reporting. A panel may profile more than 200 phenotypes and functional states through combinations of markers, but that does not create 200 independently validated interaction identities. The interaction should be named at the lineage resolution supported by the identity markers; state is an additional annotation.",
        ],
        note: {
          label: "Current design objective",
          title: ">200 phenotypes and states; >25 lineage-level interaction types.",
          text: "These are panel-design targets for a 40-plex configuration. Exact resolution and event yield depend on the sample, controls, marker performance and experiment-specific validation.",
        },
      },
      {
        heading: "Fluorophore assignment follows biology",
        paragraphs: [
          "Brightness alone is not a complete assignment strategy. Co-expressed markers, antigen density, spectral similarity and spreading error must be considered together. Dim but essential lineage markers need sufficient resolution, while markers that define opposite sides of an interaction should not compromise one another when detected in the same event.",
          "The practical process is iterative: establish expected antigen density, build a co-expression matrix, reserve favourable channels for critical identities, place abundant antigens on less sensitive fluorophores, and test the full panel on the actual sample type. Single-stain references, fluorescence-minus-one controls where informative and condition-matched biological controls remain essential.",
        ],
      },
      {
        heading: "Validate the panel as an interaction assay",
        paragraphs: [
          "A panel that resolves singlet populations can still fail in interacting events. Validation should therefore test known positive and negative interaction conditions, confirm that the expected lineage pairs are recovered, and assess whether state-marker patterns remain interpretable when signals from two cells are combined.",
          "Technical parameters belong in the validation as well: cell concentration, processing time, fixation, filtering, flow rate and acquisition stability. The objective is not the largest possible marker count; it is a reproducible interaction map at the resolution required for the decision.",
        ],
        bullets: [
          "Define the biological decision and expected interacting lineages.",
          "Lock the minimum lineage backbone and viability strategy.",
          "Allocate state and functional markers to answer secondary questions.",
          "Optimize the spectral matrix around simultaneous lineage signals.",
          "Validate with interaction-positive, baseline and technical controls.",
        ],
      },
      {
        heading: "From panel specification to study design",
        paragraphs: [
          "Panel design and experimental design should be developed together. A strong 40-plex panel cannot rescue missing controls or confounded batches, while a focused panel can be highly informative when the conditions are aligned to the decision.",
          "For a candidate-comparison pilot, that means specifying the modality, sample system, candidate conditions, doses, time points and donor structure before finalizing the markers. The resulting panel should explain not only which cells are present, but which lineages engage and what state those cells occupy when they do.",
        ],
      },
    ],
    sources: [INTERACTOMICS_SOURCE, OMIP_069_SOURCE],
    relatedSlugs: [
      "compare-t-cell-engager-candidates",
      "existing-fcs-files-cell-interaction-analysis",
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((insight) => insight.slug === slug);
}

export function formatInsightDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
