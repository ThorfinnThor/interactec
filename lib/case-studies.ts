export type CaseStudy = {
  slug: "ibd" | "arthritis";
  title: string;
  field: string;
  file: string;
  objectKey: string;
  downloadName: string;
  previewImage: string;
  summary: string;
  facts: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ibd",
    title: "Inflammatory bowel disease",
    field: "Autoimmunity · immune-mediated inflammation",
    file: "InterAcTec_Report1_IBD.pdf",
    objectKey: "reports/InterAcTec_Report1_IBD.pdf",
    downloadName: "InterAcTec_CaseStudy_IBD.pdf",
    previewImage: "/case-study-previews/ibd.png",
    summary:
      "Interacting-cell landscape in peripheral blood of patients with ulcerative colitis and Crohn’s disease compared with healthy controls.",
    facts: ["31 donors (HC 11 · UC 9 · CD 11)", "29.9 M cells analysed", "362,102 interacting cells"],
  },
  {
    slug: "arthritis",
    title: "Juvenile idiopathic arthritis",
    field: "Autoimmunity · re-analysis of existing data",
    file: "InterAcTec_Report2_Arthritis.pdf",
    objectKey: "reports/InterAcTec_Report2_Arthritis.pdf",
    downloadName: "InterAcTec_CaseStudy_Arthritis.pdf",
    previewImage: "/case-study-previews/arthritis.png",
    summary:
      "Publicly available spectral cytometry data re-analysed for interactions: healthy vs JIA, inactive vs active disease, blood vs synovial fluid.",
    facts: ["54 PBMC donors + 8 synovial fluid samples", "7.8 M cells analysed", "12,908 interacting cells"],
  },
];

export const caseStudyBySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
