export interface Director {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  occupation: string;
  address: string;
  postcode: string;
}

export interface Shareholder {
  id: string;
  name: string;
  shares: number;
  shareClass: string;
}

export interface PSC {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  postcode: string;
  natureOfControl: string[];
}

export interface FormationDraft {
  // Package selection
  selectedPackage: {
    id: string;
    name: string;
    price: number;
  } | null;

  // Step 1: Company Basics
  companyNamePreferences: string[];
  companyType: string;

  // Step 2: Registered Office
  registeredOfficeOption: 'own' | 'service';
  registeredOfficeAddress: string;
  registeredOfficePostcode: string;

  // Step 3: Directors
  directors: Director[];

  // Step 4: Shareholders
  shareholders: Shareholder[];
  totalShares: number;
  shareCapital: number;

  // Step 5: PSC
  pscs: PSC[];

  // Step 6: SIC Codes
  sicCodes: string[];

  // Step 7: Contact
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export const defaultFormationDraft: FormationDraft = {
  selectedPackage: null,
  companyNamePreferences: ['', '', ''],
  companyType: 'private-limited-shares',
  registeredOfficeOption: 'own',
  registeredOfficeAddress: '',
  registeredOfficePostcode: '',
  directors: [],
  shareholders: [],
  totalShares: 100,
  shareCapital: 100,
  pscs: [],
  sicCodes: [],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
};

