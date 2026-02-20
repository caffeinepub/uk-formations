export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'formation' | 'office' | 'support' | 'compliance';
  features: string[];
  pricing?: {
    amount: number;
    period?: string;
    note?: string;
  };
  popular?: boolean;
}

export const servicesCatalog: Service[] = [
  // Company Formation Services
  {
    id: 'ltd-formation',
    name: 'Limited Company Formation',
    description: 'Register your private limited company with Companies House quickly and efficiently.',
    category: 'formation',
    features: [
      'Companies House registration',
      'Certificate of Incorporation',
      'Memorandum & Articles of Association',
      'Share certificates',
      'Same-day registration available',
    ],
    pricing: {
      amount: 29.99,
      note: 'Plus Companies House fee',
    },
    popular: true,
  },
  {
    id: 'llp-formation',
    name: 'LLP Formation',
    description: 'Form a Limited Liability Partnership ideal for professional services and partnerships.',
    category: 'formation',
    features: [
      'LLP registration with Companies House',
      'Certificate of Incorporation',
      'LLP Agreement template',
      'Designated member appointments',
    ],
    pricing: {
      amount: 39.99,
      note: 'Plus Companies House fee',
    },
  },
  {
    id: 'ready-made-company',
    name: 'Ready-Made Company',
    description: 'Purchase a pre-registered company and start trading immediately.',
    category: 'formation',
    features: [
      'Instant availability',
      'Clean trading history',
      'All incorporation documents',
      'Name change service included',
    ],
    pricing: {
      amount: 99.99,
    },
  },
  // Registered Office Services
  {
    id: 'registered-office',
    name: 'Registered Office Address',
    description: 'Professional UK business address for your company registration and official correspondence.',
    category: 'office',
    features: [
      'London or regional address options',
      'Mail forwarding service',
      'Companies House compliant',
      'Privacy protection',
      'Instant setup',
    ],
    pricing: {
      amount: 49.99,
      period: 'per year',
    },
    popular: true,
  },
  {
    id: 'business-address',
    name: 'Business Address Service',
    description: 'Use our prestigious business address for your marketing and correspondence.',
    category: 'office',
    features: [
      'Prime business location',
      'Mail handling and forwarding',
      'Telephone answering available',
      'Meeting room access',
    ],
    pricing: {
      amount: 79.99,
      period: 'per year',
    },
  },
  {
    id: 'mail-forwarding',
    name: 'Mail Forwarding',
    description: 'Receive and forward your business mail to any UK or international address.',
    category: 'office',
    features: [
      'Weekly or daily forwarding',
      'Scan and email service',
      'Secure mail storage',
      'International forwarding available',
    ],
    pricing: {
      amount: 29.99,
      period: 'per month',
    },
  },
  // Business Support Services
  {
    id: 'company-secretary',
    name: 'Company Secretary Service',
    description: 'Professional company secretary to handle your statutory obligations and compliance.',
    category: 'support',
    features: [
      'Annual return filing',
      'Statutory register maintenance',
      'Board meeting minutes',
      'Compliance monitoring',
      'Companies House liaison',
    ],
    pricing: {
      amount: 199.99,
      period: 'per year',
    },
  },
  {
    id: 'director-service',
    name: 'Nominee Director Service',
    description: 'Appoint a professional nominee director for your company.',
    category: 'support',
    features: [
      'Experienced professional directors',
      'Full indemnity insurance',
      'Confidentiality agreement',
      'Regular reporting',
    ],
    pricing: {
      amount: 499.99,
      period: 'per year',
    },
  },
  {
    id: 'bank-account',
    name: 'Business Bank Account Assistance',
    description: 'Expert guidance to help you open a UK business bank account quickly.',
    category: 'support',
    features: [
      'Application preparation',
      'Document review',
      'Bank introductions',
      'Multiple bank options',
      'Fast-track service',
    ],
    pricing: {
      amount: 149.99,
    },
  },
  // Compliance Services
  {
    id: 'vat-registration',
    name: 'VAT Registration',
    description: 'Register your business for VAT with HMRC efficiently and correctly.',
    category: 'compliance',
    features: [
      'VAT number application',
      'HMRC submission',
      'Threshold guidance',
      'VAT scheme advice',
      'Certificate of registration',
    ],
    pricing: {
      amount: 99.99,
    },
    popular: true,
  },
  {
    id: 'paye-registration',
    name: 'PAYE Registration',
    description: 'Register as an employer with HMRC to pay your employees through PAYE.',
    category: 'compliance',
    features: [
      'Employer PAYE registration',
      'HMRC submission',
      'Employer reference number',
      'Payroll guidance',
    ],
    pricing: {
      amount: 79.99,
    },
  },
  {
    id: 'confirmation-statement',
    name: 'Confirmation Statement Filing',
    description: 'Annual confirmation statement filing service to keep your company compliant.',
    category: 'compliance',
    features: [
      'Annual statement preparation',
      'Companies House filing',
      'Accuracy guarantee',
      'Deadline reminders',
    ],
    pricing: {
      amount: 39.99,
      period: 'per year',
    },
  },
];

export const getServicesByCategory = (category: Service['category']) => {
  return servicesCatalog.filter((service) => service.category === category);
};

export const getServiceById = (id: string) => {
  return servicesCatalog.find((service) => service.id === id);
};

export const getPopularServices = () => {
  return servicesCatalog.filter((service) => service.popular);
};
