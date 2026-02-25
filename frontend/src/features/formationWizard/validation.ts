import { FormationDraft } from './formationDraft';

export interface ValidationErrors {
  [key: string]: string;
}

export function validateCompanyBasics(draft: FormationDraft): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!draft.companyNamePreferences[0]?.trim()) {
    errors.companyName1 = 'At least one company name preference is required';
  }

  if (!draft.companyType) {
    errors.companyType = 'Please select a company type';
  }

  return errors;
}

export function validateRegisteredOffice(draft: FormationDraft): ValidationErrors {
  const errors: ValidationErrors = {};

  if (draft.registeredOfficeOption === 'own') {
    if (!draft.registeredOfficeAddress?.trim()) {
      errors.address = 'Registered office address is required';
    }
    if (!draft.registeredOfficePostcode?.trim()) {
      errors.postcode = 'Postcode is required';
    }
  }

  return errors;
}

export function validateDirectors(draft: FormationDraft): ValidationErrors {
  const errors: ValidationErrors = {};

  if (draft.directors.length === 0) {
    errors.directors = 'At least one director is required';
  }

  draft.directors.forEach((director, index) => {
    if (!director.firstName?.trim()) {
      errors[`director${index}FirstName`] = 'First name is required';
    }
    if (!director.lastName?.trim()) {
      errors[`director${index}LastName`] = 'Last name is required';
    }
    if (!director.dateOfBirth) {
      errors[`director${index}DateOfBirth`] = 'Date of birth is required';
    }
    if (!director.nationality?.trim()) {
      errors[`director${index}Nationality`] = 'Nationality is required';
    }
    if (!director.address?.trim()) {
      errors[`director${index}Address`] = 'Address is required';
    }
  });

  return errors;
}

export function validateShareholders(draft: FormationDraft): ValidationErrors {
  const errors: ValidationErrors = {};

  if (draft.shareholders.length === 0) {
    errors.shareholders = 'At least one shareholder is required';
  }

  const totalShares = draft.shareholders.reduce((sum, sh) => sum + (sh.shares || 0), 0);
  if (totalShares !== draft.totalShares) {
    errors.totalShares = `Total allocated shares (${totalShares}) must equal total shares (${draft.totalShares})`;
  }

  draft.shareholders.forEach((shareholder, index) => {
    if (!shareholder.name?.trim()) {
      errors[`shareholder${index}Name`] = 'Shareholder name is required';
    }
    if (!shareholder.shares || shareholder.shares <= 0) {
      errors[`shareholder${index}Shares`] = 'Number of shares must be greater than 0';
    }
  });

  return errors;
}

export function validatePSC(draft: FormationDraft): ValidationErrors {
  const errors: ValidationErrors = {};

  if (draft.pscs.length === 0) {
    errors.pscs = 'At least one Person with Significant Control is required';
  }

  draft.pscs.forEach((psc, index) => {
    if (!psc.firstName?.trim()) {
      errors[`psc${index}FirstName`] = 'First name is required';
    }
    if (!psc.lastName?.trim()) {
      errors[`psc${index}LastName`] = 'Last name is required';
    }
    if (!psc.dateOfBirth) {
      errors[`psc${index}DateOfBirth`] = 'Date of birth is required';
    }
    if (!psc.nationality?.trim()) {
      errors[`psc${index}Nationality`] = 'Nationality is required';
    }
    if (!psc.address?.trim()) {
      errors[`psc${index}Address`] = 'Address is required';
    }
    if (psc.natureOfControl.length === 0) {
      errors[`psc${index}NatureOfControl`] = 'At least one nature of control is required';
    }
  });

  return errors;
}

export function validateSicCodes(draft: FormationDraft): ValidationErrors {
  const errors: ValidationErrors = {};

  if (draft.sicCodes.length === 0) {
    errors.sicCodes = 'At least one SIC code is required';
  }

  return errors;
}

export function validateContact(draft: FormationDraft): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!draft.contactEmail?.trim()) {
    errors.contactEmail = 'Contact email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.contactEmail)) {
    errors.contactEmail = 'Please enter a valid email address';
  }

  if (!draft.contactPhone?.trim()) {
    errors.contactPhone = 'Contact phone is required';
  }

  return errors;
}

