import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServicesByCategory } from "@/features/services/servicesCatalog";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Building2,
  FileText,
  Phone,
  Receipt,
  UserCheck,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "business-telephone-answering": Phone,
  "business-telephone-forwarding": Phone,
  "confirmation-statement": FileText,
  "dormant-company-accounts": BookOpen,
  "company-name-change": Building2,
  "director-appointment-resignation": UserCheck,
  "vat-registration": Receipt,
};

export default function AdditionalServicesPage() {
  const additionalServices = getServicesByCategory("additional");

  // Group Business Telephone sub-services
  const telServices = additionalServices.filter((s) =>
    s.id.startsWith("business-telephone"),
  );
  const otherServices = additionalServices.filter(
    (s) => !s.id.startsWith("business-telephone"),
  );

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Additional Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your company's ongoing compliance and administration with our
            range of professional add-on services.
          </p>
        </div>
      </Section>

      {/* Business Telephone (has sub-services — own page) */}
      <Section>
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Business Telephone</h2>
          <p className="text-muted-foreground mb-6">
            Two options to give your company a professional UK telephone
            presence.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {telServices.map((service) => {
              const Icon = iconMap[service.id] ?? Phone;
              return (
                <Card
                  key={service.id}
                  className="border-2 hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {service.name}
                        </CardTitle>
                        {service.pricing && (
                          <p className="text-xl font-bold text-primary mt-1">
                            £{service.pricing.amount.toFixed(2)}
                            <span className="text-sm font-normal text-muted-foreground ml-1">
                              {service.pricing.period}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link to="/services/business-telephone">
                View Business Telephone Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Other additional services */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Company Administration</h2>
          <p className="text-muted-foreground mb-6">
            Keep your company compliant with our filing and administration
            services.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((service) => {
              const Icon = iconMap[service.id] ?? FileText;
              return (
                <Card
                  key={service.id}
                  className="border-2 hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    {service.pricing && (
                      <p className="text-xl font-bold text-primary">
                        £{service.pricing.amount.toFixed(2)}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {service.pricing.period}
                        </span>
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                    <Button asChild className="w-full mt-4" size="sm">
                      <Link to="/contact">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">
            Not sure which service you need?
          </h2>
          <p className="text-lg opacity-90">
            Our experts are happy to guide you to the right solution for your
            business.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
