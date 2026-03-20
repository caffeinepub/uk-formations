import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Building2,
  FileText,
  MapPin,
  Phone,
  Receipt,
  UserCheck,
} from "lucide-react";

export default function ServicesPage() {
  const planStructure = [
    {
      name: "Digital",
      price: "£1.99",
      highlight: "Formation essentials — 100% digital",
    },
    {
      name: "Digital & Print",
      price: "£9.99",
      highlight: "Digital + printed documents & expert review",
      popular: true,
    },
    {
      name: "Print Plus",
      price: "£19.99",
      highlight:
        "Everything in Digital & Print + London registered office (3 months)",
    },
    {
      name: "All Inclusive",
      price: "£49.99",
      highlight:
        "Complete package with address, mail forwarding & VAT registration",
    },
  ];

  const addressServices = [
    {
      name: "Registered Office",
      price: "£44.99/yr",
      description: "Mail forwarding, scan & email, collection",
    },
    {
      name: "Registered Office+",
      price: "£59.99/yr",
      description: "As above + unlimited directors service address",
    },
    {
      name: "Mailing Address",
      price: "£169.99/yr",
      description: "Business mail forwarding & all mail services",
    },
    {
      name: "Virtual Office",
      price: "£199.99/yr",
      description: "All address services in one complete package",
    },
  ];

  const additionalServices = [
    {
      icon: Phone,
      name: "Business Telephone",
      sub: "Call Answering or Number Forwarding",
      link: "/services/business-telephone" as const,
    },
    {
      icon: FileText,
      name: "Confirmation Statement",
      sub: "£53.19 per submission",
      link: "/services/additional-services" as const,
    },
    {
      icon: BookOpen,
      name: "Dormant Company Accounts",
      sub: "£49.99 per year",
      link: "/services/additional-services" as const,
    },
    {
      icon: Building2,
      name: "Company Name Change",
      sub: "£34.99 per change",
      link: "/services/additional-services" as const,
    },
    {
      icon: UserCheck,
      name: "Director Appointment & Resignation",
      sub: "£19.99 per submission",
      link: "/services/additional-services" as const,
    },
    {
      icon: Receipt,
      name: "VAT Registration",
      sub: "£39.99 per registration",
      link: "/services/additional-services" as const,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-12 md:pt-20">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to form, run, and grow your UK company — from
            initial registration to ongoing compliance.
          </p>
        </div>
      </Section>

      {/* Plan Structure */}
      <Section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Plan Structure</h2>
            <p className="text-muted-foreground">
              Company formation packages — choose the one that suits your needs.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/services/company-formation">
              Compare all plans
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {planStructure.map((plan) => (
            <Card
              key={plan.name}
              className={`border-2 hover:shadow-md transition-shadow ${plan.popular ? "border-primary" : ""}`}
            >
              <CardHeader>
                {plan.popular && (
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                    Most Popular
                  </span>
                )}
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-2xl font-bold text-primary">{plan.price}</p>
                <p className="text-xs text-muted-foreground">
                  + Companies House fee
                </p>
              </CardHeader>
              <CardContent>
                <CardDescription>{plan.highlight}</CardDescription>
                <Button
                  asChild
                  className="w-full mt-4"
                  size="sm"
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link to="/start-formation">Start Formation</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Address Services */}
      <Section className="bg-muted/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Address Services</h2>
            <p className="text-muted-foreground">
              Professional London business addresses and mail handling.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/services/address-services">
              View all plans
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {addressServices.map((svc) => (
            <Card
              key={svc.name}
              className="border-2 hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <MapPin className="h-6 w-6 text-primary mb-2" />
                <CardTitle className="text-lg">{svc.name}</CardTitle>
                <p className="text-xl font-bold text-primary">{svc.price}</p>
              </CardHeader>
              <CardContent>
                <CardDescription>{svc.description}</CardDescription>
                <Button
                  asChild
                  className="w-full mt-4"
                  size="sm"
                  variant="outline"
                >
                  <Link to="/services/address-services">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Additional Services */}
      <Section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Additional Services</h2>
            <p className="text-muted-foreground">
              Ongoing compliance and administration services for your company.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/services/additional-services">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <Card
                key={svc.name}
                className="border-2 hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <Icon className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-lg">{svc.name}</CardTitle>
                  <CardDescription>{svc.sub}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    <Link to={svc.link}>
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

      {/* CTA */}
      <Section className="bg-muted/30">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your formation plan and get your UK company registered today.
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
