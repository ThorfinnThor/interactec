import { CONTACT_EMAIL } from "@/lib/legal";
import type { Env } from "@/lib/server/store";

const FORM_SENDER = "website@forms.interactec.bio";

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  role: string;
  modality: string;
  message: string;
};

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function notifyContactSubmission(env: Env, id: string, data: ContactSubmission) {
  const subjectCompany = oneLine(data.company) || "unknown company";
  const text = [
    "A new project-feasibility request was submitted on interactec.bio.",
    "",
    `Reference: ${id}`,
    `Name: ${data.name}`,
    `Work email: ${data.email}`,
    `Company: ${data.company}`,
    `Role: ${data.role || "Not provided"}`,
    `Modality: ${data.modality || "Not provided"}`,
    "",
    "Project details:",
    data.message,
    "",
    "The full submission remains available in the protected InterAcTec admin inbox.",
  ].join("\n");

  await env.CONTACT_EMAIL.send({
    to: CONTACT_EMAIL,
    from: { name: "InterAcTec website", email: FORM_SENDER },
    replyTo: { name: oneLine(data.name), email: data.email },
    subject: `New feasibility request — ${subjectCompany}`,
    text,
  });
}
