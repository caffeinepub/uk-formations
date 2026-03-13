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
  Building2,
  CheckCircle2,
  Clock,
  FileCheck,
  FileText,
  MapPin,
  Shield,
  Users,
} from "lucide-react";

export default function HomePage() {
  const benefits = [
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Get your company registered within 24-48 hours",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Fully compliant with Companies House regulations",
    },
    {
      icon: FileText,
      title: "Complete Documentation",
      description: "All necessary documents prepared and filed",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated support throughout the process",
    },
  ];

  const coreServices = [
    {
      icon: Building2,
      title: "Company Formation",
      description:
        "Register your UK limited company, LLP, or other business structure quickly and efficiently.",
      image: "/assets/generated/service-formation.dim_120x120.png",
      link: "/services/company-formation",
    },
    {
      icon: MapPin,
      title: "Registered Office",
      description:
        "Professional business address with mail handling and forwarding services.",
      image: "/assets/generated/service-office.dim_120x120.png",
      link: "/services/registered-office",
    },
    {
      icon: Users,
      title: "Business Support",
      description:
        "Company secretary, director services, and business bank account assistance.",
      image: "/assets/generated/service-support.dim_120x120.png",
      link: "/services/business-support",
    },
    {
      icon: FileCheck,
      title: "Compliance Services",
      description:
        "VAT registration, PAYE setup, and annual confirmation statement filing.",
      image: "/assets/generated/service-compliance.dim_120x120.png",
      link: "/services/business-support",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Check Your Company Name",
      description:
        "Search to confirm your desired company name is not already registered at Companies House.",
      link: "/start-formation",
    },
    {
      number: "02",
      title: "Choose Your Package",
      description:
        "Select the formation package that suits your needs — from basic registration to full business support.",
      link: "/pricing",
    },
    {
      number: "03",
      title: "Review Your Features",
      description:
        "See exactly what is included in your chosen package — all services, documents, and support.",
      link: "/start-formation",
    },
    {
      number: "04",
      title: "Company Formed",
      description:
        "We handle all the paperwork and file with Companies House. You receive your incorporation documents.",
      link: "/start-formation",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-20 md:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Form Your UK Company with Confidence
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Professional company formation services that make starting your UK
              business simple, fast, and hassle-free. Get registered with
              Companies House in as little as 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/start-formation">Start Your Formation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/pricing">View Packages</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Companies House Approved
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  24-48 Hour Processing
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/assets/generated/uk-formations-hero.dim_1600x900.png"
              alt="UK Company Formation"
              className="w-full h-auto rounded-lg shadow-medium"
            />
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose UK Formations?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make company formation straightforward with our expert service
            and comprehensive support.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="border-2">
              <CardHeader>
                <benefit.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Core Services Section */}
      <Section className="bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive company formation and business support services to
            help you succeed.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((service) => (
            <Card
              key={service.title}
              className="border-2 hover:shadow-lg transition-shadow group"
            >
              <CardHeader>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-16 h-16 mb-3 rounded-lg"
                />
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full group-hover:bg-muted"
                >
                  <Link to={service.link}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to get your UK company registered and ready for
            business.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/start-formation">Begin Your Formation</Link>
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-primary-foreground">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Your Business?
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Join thousands of entrepreneurs who have successfully formed their
            UK companies with our expert service.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/start-formation">Get Started Today</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
