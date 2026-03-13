import type { FormationOrderInput } from "../../backend";
import type { FormationDraft } from "./formationDraft";

const CONFIRMATION_KEY = "uk-formations-confirmation";

export interface OrderConfirmation {
  orderId: number;
  companyName: string;
  packageName: string;
  packagePrice: number;
  timestamp: string;
}

export function convertDraftToOrderInput(
  draft: FormationDraft,
): FormationOrderInput {
  const contactDetails = JSON.stringify({
    name: draft.contactName,
    phone: draft.contactPhone,
    companyNamePreferences: draft.companyNamePreferences,
    companyType: draft.companyType,
    registeredOffice: {
      option: draft.registeredOfficeOption,
      postcode: draft.registeredOfficePostcode,
    },
    totalShares: draft.totalShares,
    shareCapital: draft.shareCapital,
    package: draft.selectedPackage,
  });

  return {
    customerName: draft.contactName || "Not provided",
    contactEmail: draft.contactEmail,
    companyName: draft.companyNamePreferences[0] || "Not provided",
    packageSelected: draft.selectedPackage?.name || "Not selected",
    registeredOfficeAddress:
      draft.registeredOfficeAddress || draft.registeredOfficePostcode || "",
    directorDetails: JSON.stringify(draft.directors),
    shareholderDetails: JSON.stringify(draft.shareholders),
    pscDetails: JSON.stringify(draft.pscs),
    sicCodes: draft.sicCodes || [],
    contactDetails,
  };
}

export function saveConfirmation(confirmation: OrderConfirmation) {
  try {
    sessionStorage.setItem(CONFIRMATION_KEY, JSON.stringify(confirmation));
  } catch (error) {
    console.error("Failed to save confirmation:", error);
  }
}

export function loadConfirmation(): OrderConfirmation | null {
  try {
    const stored = sessionStorage.getItem(CONFIRMATION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load confirmation:", error);
  }
  return null;
}

export function clearConfirmation() {
  try {
    sessionStorage.removeItem(CONFIRMATION_KEY);
  } catch (error) {
    console.error("Failed to clear confirmation:", error);
  }
}
