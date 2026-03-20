export interface Service {
  id: string;
  name: string;
  description: string;
  category: "formation" | "office" | "support" | "compliance" | "additional";
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
    id: "ltd-formation",
    name: "Limited Company (Ltd) by Shares",
    description:
      "Register your private limited company with Companies House quickly and efficiently.",
    category: "formation",
    features: [
      "Companies House registration",
      "Certificate of Incorporation",
      "Memorandum & Articles of Association",
      "Share certificates",
      "Same-day registration available",
    ],
    popular: true,
  },
  {
    id: "llp-formation",
    name: "LLP Formation",
    description:
      "Form a Limited Liability Partnership ideal for professional services and partnerships.",
    category: "formation",
    features: [
      "LLP registration with Companies House",
      "Certificate of Incorporation",
      "LLP Agreement template",
      "Designated member appointments",
    ],
  },
  {
    id: "ltd-guarantee",
    name: "Limited by Guarantee",
    description:
      "Register a company limited by guarantee, ideal for non-profits, charities, and clubs.",
    category: "formation",
    features: [
      "Companies House registration",
      "Certificate of Incorporation",
      "Memorandum & Articles of Association",
      "Suitable for charities & non-profits",
    ],
  },
  // Address Services
  {
    id: "registered-office",
    name: "Registered Office",
    description:
      "A professional London registered office address for your company registration and HMRC correspondence.",
    category: "office",
    features: [
      "Registered Office Address",
      "Free Mail Forwarding",
      "Free Scan and Email",
      "Free Mail Collection",
      "Mail Sorted Daily",
    ],
    pricing: {
      amount: 44.99,
      period: "per year",
    },
    popular: true,
  },
  {
    id: "registered-office-plus",
    name: "Registered Office+",
    description:
      "Everything in Registered Office plus unlimited directors service address.",
    category: "office",
    features: [
      "Registered Office Address",
      "Free Mail Forwarding",
      "Free Scan and Email",
      "Free Mail Collection",
      "Mail Sorted Daily",
      "Unlimited Directors Service Address",
    ],
    pricing: {
      amount: 59.99,
      period: "per year",
    },
  },
  {
    id: "mailing-address",
    name: "Mailing Address",
    description:
      "A professional mailing address for all your business correspondence.",
    category: "office",
    features: [
      "Free Mail Forwarding",
      "Free Scan and Email",
      "Free Mail Collection",
      "Mail Sorted Daily",
      "Business Mail Forwarding",
    ],
    pricing: {
      amount: 169.99,
      period: "per year",
    },
  },
  {
    id: "virtual-office",
    name: "Virtual Office",
    description:
      "The complete virtual office solution with all mail and address services included.",
    category: "office",
    features: [
      "Registered Office Address",
      "Free Mail Forwarding",
      "Free Scan and Email",
      "Free Mail Collection",
      "Mail Sorted Daily",
      "Unlimited Directors Service Address",
      "Business Mail Forwarding",
    ],
    pricing: {
      amount: 199.99,
      period: "per year",
    },
  },
  // Additional Services
  {
    id: "business-telephone-answering",
    name: "Business Telephone – With Call Answering",
    description:
      "A dedicated business telephone number with professional call answering service.",
    category: "additional",
    features: [
      "Dedicated UK business number",
      "Professional call answering",
      "Messages forwarded by email",
      "Customised greeting",
    ],
    pricing: {
      amount: 239.99,
      period: "per year",
    },
  },
  {
    id: "business-telephone-forwarding",
    name: "Business Telephone – Number Forwarding",
    description:
      "A dedicated business telephone number with call forwarding to your chosen number.",
    category: "additional",
    features: [
      "Dedicated UK business number",
      "Call forwarding to any UK number",
      "Voicemail included",
    ],
    pricing: {
      amount: 10.41,
      period: "per month",
    },
  },
  {
    id: "confirmation-statement",
    name: "Confirmation Statement",
    description:
      "Annual confirmation statement filing service to keep your company compliant with Companies House.",
    category: "additional",
    features: [
      "Preparation and filing",
      "Companies House submission",
      "Accuracy guarantee",
      "Deadline reminders",
    ],
    pricing: {
      amount: 53.19,
      period: "per submission",
    },
  },
  {
    id: "dormant-company-accounts",
    name: "Dormant Company Accounts",
    description:
      "Filing of dormant company accounts with Companies House and HMRC.",
    category: "additional",
    features: [
      "Dormant accounts preparation",
      "Companies House filing",
      "HMRC submission",
      "Deadline management",
    ],
    pricing: {
      amount: 49.99,
      period: "per year",
    },
  },
  {
    id: "company-name-change",
    name: "Company Name Change",
    description:
      "Change your registered company name with Companies House quickly and accurately.",
    category: "additional",
    features: [
      "Companies House name change filing",
      "New certificate of incorporation",
      "Updated memorandum & articles",
      "Confirmation of change",
    ],
    pricing: {
      amount: 34.99,
      period: "per change",
    },
  },
  {
    id: "director-appointment-resignation",
    name: "Director Appointment & Resignation",
    description:
      "File director appointments or resignations with Companies House on your behalf.",
    category: "additional",
    features: [
      "Appointment or resignation filing",
      "Companies House submission",
      "Updated statutory register",
      "Confirmation certificate",
    ],
    pricing: {
      amount: 19.99,
      period: "per submission",
    },
  },
  {
    id: "vat-registration",
    name: "VAT Registration",
    description:
      "Register your business for VAT with HMRC. We assess mandatory vs voluntary registration, advise on the best VAT scheme, and handle the full submission process.",
    category: "additional",
    features: [
      "Mandatory vs voluntary registration assessment",
      "VAT scheme options (Standard, Flat Rate, Cash Accounting)",
      "Submission to HMRC on your behalf",
      "VAT registration number provision",
      "Ongoing VAT compliance guidance",
    ],
    pricing: {
      amount: 39.99,
      period: "per registration",
    },
    popular: true,
  },
  // Compliance (legacy, keep for PAYE page)
  {
    id: "paye-registration",
    name: "PAYE Registration",
    description:
      "Register as an employer with HMRC and set up your PAYE scheme. We handle the full registration and provide your employer reference number.",
    category: "compliance",
    features: [
      "Employer PAYE scheme registration with HMRC",
      "Employer reference number provision",
      "National Insurance setup guidance",
      "Income tax setup and configuration",
      "Payroll compliance advisory",
    ],
    pricing: {
      amount: 49.99,
      period: "per registration",
    },
  },
];

export const getServicesByCategory = (category: Service["category"]) => {
  return servicesCatalog.filter((service) => service.category === category);
};

export const getServiceById = (id: string) => {
  return servicesCatalog.find((service) => service.id === id);
};

export const getPopularServices = () => {
  return servicesCatalog.filter((service) => service.popular);
};
