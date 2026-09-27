/**
 * Impressum / legal-entity details (§ 5 DDG). Fill in every required field; the /impressum page
 * and its footer link only appear once `isLegalComplete()` is true, so nothing half-filled goes live.
 */
export const LEGAL = {
  companyName: "", // e.g. "InterAcTec GmbH"
  legalForm: "", // e.g. "GmbH"
  street: "",
  postalCodeCity: "",
  country: "Germany",
  representedBy: "", // managing directors
  email: "hello@interactec.bio",
  phone: "", // optional
  registerCourt: "", // e.g. "Amtsgericht Heidelberg" (if registered)
  registerNumber: "", // e.g. "HRB 123456"
  vatId: "", // USt-IdNr., if available
  contentResponsible: "", // § 18 Abs. 2 MStV: name + address, if editorial content
};

export const CONTACT_EMAIL = LEGAL.email;

export function isLegalComplete() {
  return Boolean(LEGAL.companyName && LEGAL.street && LEGAL.postalCodeCity && LEGAL.representedBy && LEGAL.email);
}
