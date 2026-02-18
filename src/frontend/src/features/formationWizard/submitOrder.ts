import { FormationDraft } from './formationDraft';
import { FormationOrderInput } from '../../backend';

const CONFIRMATION_KEY = 'uk-formations-confirmation';

export interface OrderConfirmation {
  orderId: number;
  companyName: string;
  packageName: string;
  packagePrice: number;
  timestamp: string;
}

export function convertDraftToOrderInput(draft: FormationDraft): FormationOrderInput {
  const additionalDetails = JSON.stringify({
    package: draft.selectedPackage,
    companyNamePreferences: draft.companyNamePreferences,
    companyType: draft.companyType,
    registeredOffice: {
      option: draft.registeredOfficeOption,
      address: draft.registeredOfficeAddress,
      postcode: draft.registeredOfficePostcode,
    },
    directors: draft.directors,
    shareholders: draft.shareholders,
    totalShares: draft.totalShares,
    shareCapital: draft.shareCapital,
    pscs: draft.pscs,
    sicCodes: draft.sicCodes,
  });

  return {
    customerName: draft.contactName || 'Not provided',
    contactEmail: draft.contactEmail,
    formationType: draft.companyType,
    businessName: draft.companyNamePreferences[0] || 'Not provided',
    additionalDetails,
  };
}

export function saveConfirmation(confirmation: OrderConfirmation) {
  try {
    sessionStorage.setItem(CONFIRMATION_KEY, JSON.stringify(confirmation));
  } catch (error) {
    console.error('Failed to save confirmation:', error);
  }
}

export function loadConfirmation(): OrderConfirmation | null {
  try {
    const stored = sessionStorage.getItem(CONFIRMATION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load confirmation:', error);
  }
  return null;
}

export function clearConfirmation() {
  try {
    sessionStorage.removeItem(CONFIRMATION_KEY);
  } catch (error) {
    console.error('Failed to clear confirmation:', error);
  }
}

