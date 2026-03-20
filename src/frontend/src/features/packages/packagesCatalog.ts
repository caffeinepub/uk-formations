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
    id: "digital",
    name: "Digital",
    price: 1.99,
    description: "Digital-only company formation package",
    features: [
      "Company Formation (excl. Companies House £100 filing fee)",
      "FREE Fast Track Business Bank Account (Barclays, Mettle, Tide)",
      "FREE .co.uk Domain Name",
      "FREE Lifetime company secretarial support",
      "FREE online portal to manage all your companies",
      "FREE Company deadline reminder service",
      "10% off Business Insurance",
      "Discount on bookkeeping software",
      "Web authentication code",
      "Digital certificate of incorporation",
      "Digital Memorandum & Articles",
      "Digital Share certificate",
    ],
  },
  {
    id: "digital-print",
    name: "Digital & Print",
    price: 9.99,
    popular: true,
    description: "Digital formation plus printed documents",
    features: [
      "Everything in Digital",
      "Digital Company Register",
      "Digital Company Incorporation Minutes",
      "Printed Certificate of Incorporation",
      "Printed Share Certificate",
      "Printed Memorandum & Articles",
      "Printed Company Register",
      "Expert Pre Submission review",
      "GDPR Compliance pack",
    ],
  },
  {
    id: "print-plus",
    name: "Print Plus",
    price: 19.99,
    description: "Digital & Print plus registered office",
    features: [
      "Everything in Digital & Print",
      "London Registered office service for 3 months",
    ],
  },
  {
    id: "all-inclusive",
    name: "All Inclusive",
    price: 49.99,
    description: "Complete package with all services included",
    features: [
      "Everything in Print Plus",
      "London Directors Service Address for 12 months",
      "London Business Mail Forwarding Address for 3 months",
      "VAT Registration with HMRC (Optional)",
    ],
  },
];
