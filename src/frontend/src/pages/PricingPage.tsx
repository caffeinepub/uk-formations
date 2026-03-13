import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useFormationDraft } from "../features/formationWizard/useFormationDraft";
import { packages } from "../features/packages/packagesCatalog";

export default function PricingPage() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useFormationDraft();

  const handleSelectPackage = (packageId: string) => {
    const selectedPackage = packages.find((p) => p.id === packageId);
    if (selectedPackage) {
      updateDraft({
        selectedPackage: {
          id: selectedPackage.id,
          name: selectedPackage.name,
          price: selectedPackage.price,
        },
      });
      navigate({ to: "/formation-wizard" });
    }
  };

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Formation Package
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Select the package that best suits your business needs. All packages
            include Companies House registration and essential documentation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative ${
                pkg.popular
                  ? "border-primary border-2 shadow-medium"
                  : "border-2"
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold">£{pkg.price}</span>
                  <span className="text-muted-foreground"> + VAT</span>
                </div>
                <CardDescription className="text-base">
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSelectPackage(pkg.id)}
                  className="w-full"
                  variant={pkg.popular ? "default" : "outline"}
                  size="lg"
                >
                  {draft.selectedPackage?.id === pkg.id
                    ? "Selected"
                    : "Select Package"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Not sure which package is right for you?
          </p>
          <Button asChild variant="outline">
            <Link to="/contact">Contact Us for Advice</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
