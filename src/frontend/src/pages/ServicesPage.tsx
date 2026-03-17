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
import { getServicesByCategory } from "@/features/services/servicesCatalog";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calculator,
  FileCheck,
  MapPin,
  Users,
} from "lucide-react";

export default function ServicesPage() {
  const categories = [
    {
      id: "formation" as const,
      title: "Company Formation",
      description:
        "Professional company registration services for all UK business types",
      icon: Building2,
      link: "/services/company-formation" as const,
    },
    {
      id: "office" as const,
      title: "Registered Office Services",
      description:
        "Professional business addresses and mail handling solutions",
      icon: MapPin,
      link: "/services/registered-office" as const,
    },
    {
      id: "support" as const,
      title: "Business Support",
      description: "Expert support services to help your business thrive",
      icon: Users,
      link: "/services/business-support" as const,
    },
    {
      id: "compliance" as const,
      title: "Compliance Services",
      description:
        "Stay compliant with all UK business regulations and requirements",
      icon: FileCheck,
      link: "/services/business-support" as const,
    },
  ];

  const taxServices = [
    {
      id: "vat-registration",
      title: "VAT Registration",
      description:
        "Register your business for VAT with HMRC. We assess mandatory vs voluntary registration, advise on the best VAT scheme, and handle the full submission process on your behalf.",
      icon: Calculator,
      link: "/services/vat-registration" as const,
      price: "£150.00",
      badge: "Popular",
    },
    {
      id: "paye-registration",
      title: "PAYE Registration",
      description:
        "Register as an employer with HMRC and set up your PAYE scheme. We handle the full registration, provide your employer reference number, and guide you through NI and income tax setup.",
      icon: Briefcase,
      link: "/services/paye-registration" as const,
      price: "£180.00",
      badge: null,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-12 md:pt-20">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive company formation and business support services to
            help you start, run, and grow your UK business with confidence.
          </p>
        </div>
        <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/assets/generated/services-hero.dim_1200x400.png"
            alt="Our Services"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <div
            style={{ display: "none" }}
            className="w-full h-full bg-primary/10 items-center justify-center"
          >
            <Building2 className="h-16 w-16 text-primary/40" />
          </div>
        </div>
      </Section>

      {/* Service Categories */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const services = getServicesByCategory(category.id);

            return (
              <Card
                key={category.id}
                className="border-2 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">
                              {service.name}
                            </h4>
                            {service.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {service.description}
                          </p>
                          {service.pricing && (
                            <p className="text-sm font-medium text-primary mt-1">
                              £{service.pricing.amount.toFixed(2)}
                              {service.pricing.period &&
                                ` ${service.pricing.period}`}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={category.link}>
                      View All {category.title} Services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Tax & Compliance Services */}
      <Section className="bg-muted/30">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tax &amp; Compliance Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay on top of your HMRC obligations with our dedicated VAT and PAYE
            registration services.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {taxServices.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className="border-2 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">
                          {service.title}
                        </CardTitle>
                        {service.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {service.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        {service.price}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                  <Button asChild className="w-full">
                    <Link to={service.link}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect package for your business and start your company
            formation journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/start-formation">Start Your Formation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
