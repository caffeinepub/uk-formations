import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormationDraft } from "@/features/formationWizard/useFormationDraft";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, X } from "lucide-react";
import { useState } from "react";

interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  popular?: boolean;
  features: {
    name: string;
    included: boolean | string;
  }[];
}

const packages: Package[] = [
  {
    id: "basic",
    name: "Basic",
    price: 29.99,
    description: "Essential formation package",
    features: [
      { name: "Company Registration", included: true },
      { name: "Certificate of Incorporation", included: true },
      { name: "Memorandum & Articles", included: true },
      { name: "Share Certificates", included: true },
      { name: "Same Day Registration", included: false },
      { name: "Registered Office (1 year)", included: false },
      { name: "Business Bank Account Assistance", included: false },
      { name: "Company Secretary Service", included: false },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 79.99,
    description: "Most popular choice",
    popular: true,
    features: [
      { name: "Company Registration", included: true },
      { name: "Certificate of Incorporation", included: true },
      { name: "Memorandum & Articles", included: true },
      { name: "Share Certificates", included: true },
      { name: "Same Day Registration", included: true },
      { name: "Registered Office (1 year)", included: true },
      { name: "Business Bank Account Assistance", included: false },
      { name: "Company Secretary Service", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 199.99,
    description: "Complete business package",
    features: [
      { name: "Company Registration", included: true },
      { name: "Certificate of Incorporation", included: true },
      { name: "Memorandum & Articles", included: true },
      { name: "Share Certificates", included: true },
      { name: "Same Day Registration", included: true },
      { name: "Registered Office (1 year)", included: true },
      { name: "Business Bank Account Assistance", included: true },
      { name: "Company Secretary Service", included: "1 year" },
    ],
  },
];

export default function ServiceComparisonTable() {
  const navigate = useNavigate();
  const { updateDraft } = useFormationDraft();
  const [_selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    const selectedPkg = packages.find((p) => p.id === packageId);
    if (selectedPkg) {
      updateDraft({
        selectedPackage: {
          id: selectedPkg.id,
          name: selectedPkg.name,
          price: selectedPkg.price,
        },
      });
    }
    navigate({ to: "/formation-wizard" });
  };

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="grid grid-cols-4 gap-6 min-w-[900px]">
          {/* Feature Column */}
          <div className="space-y-4">
            <div className="h-48" /> {/* Spacer for header */}
            {packages[0].features.map((feature) => (
              <div
                key={feature.name}
                className="h-12 flex items-center font-medium text-sm"
              >
                {feature.name}
              </div>
            ))}
            <div className="h-16" /> {/* Spacer for button */}
          </div>

          {/* Package Columns */}
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`border-2 ${pkg.popular ? "border-primary shadow-lg" : ""}`}
            >
              <CardHeader className="text-center pb-8 h-48">
                {pkg.popular && (
                  <Badge className="mb-2 w-fit mx-auto">Most Popular</Badge>
                )}
                <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                <CardDescription className="mb-4">
                  {pkg.description}
                </CardDescription>
                <div className="text-3xl font-bold text-primary">
                  £{pkg.price.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">
                  + Companies House fee
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {pkg.features.map((feature) => (
                  <div
                    key={feature.name}
                    className="h-12 flex items-center justify-center"
                  >
                    {feature.included === true ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : feature.included === false ? (
                      <X className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <span className="text-sm font-medium">
                        {feature.included}
                      </span>
                    )}
                  </div>
                ))}
                <div className="pt-4 h-16">
                  <Button
                    onClick={() => handleSelectPackage(pkg.id)}
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    Select {pkg.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet View */}
      <div className="lg:hidden space-y-6">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`border-2 ${pkg.popular ? "border-primary shadow-lg" : ""}`}
          >
            <CardHeader className="text-center">
              {pkg.popular && (
                <Badge className="mb-2 w-fit mx-auto">Most Popular</Badge>
              )}
              <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
              <CardDescription className="mb-4">
                {pkg.description}
              </CardDescription>
              <div className="text-3xl font-bold text-primary">
                £{pkg.price.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">
                + Companies House fee
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {pkg.features.map((feature) => (
                <div
                  key={feature.name}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span className="text-sm font-medium">{feature.name}</span>
                  {feature.included === true ? (
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : feature.included === false ? (
                    <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <span className="text-sm font-medium text-primary">
                      {feature.included}
                    </span>
                  )}
                </div>
              ))}
              <Button
                onClick={() => handleSelectPackage(pkg.id)}
                className="w-full mt-4"
                variant={pkg.popular ? "default" : "outline"}
              >
                Select {pkg.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
