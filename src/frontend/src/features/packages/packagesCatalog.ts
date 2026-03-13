export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export const packages: Package[] = [
  {
    id: "basic",
    name: "Basic",
    price: 49,
    description: "Essential company formation services",
    features: [
      "Companies House registration",
      "Certificate of Incorporation",
      "Memorandum & Articles of Association",
      "Share certificates",
      "Standard processing (24-48 hours)",
      "Email support",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 99,
    popular: true,
    description: "Most popular choice for new businesses",
    features: [
      "Everything in Basic",
      "Priority processing (24 hours)",
      "Digital document storage",
      "Company name check service",
      "Dedicated support",
      "Formation guide & checklist",
      "First year compliance calendar",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 199,
    description: "Complete formation with ongoing support",
    features: [
      "Everything in Standard",
      "Registered office address (1 year)",
      "Mail forwarding service",
      "Business bank account guidance",
      "VAT registration assistance",
      "Quarterly compliance reminders",
      "Priority phone support",
      "Company seal (optional)",
    ],
  },
];
