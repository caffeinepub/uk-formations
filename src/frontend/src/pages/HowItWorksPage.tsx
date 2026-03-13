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
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Shield,
  Users,
} from "lucide-react";

export default function HowItWorksPage() {
  const process = [
    {
      icon: FileText,
      title: "Choose Your Company Name",
      description:
        "Select up to three company name preferences. We will check availability with Companies House and register your preferred available name.",
    },
    {
      icon: Building2,
      title: "Select Company Type",
      description:
        "Choose your company structure (typically Private Limited by Shares). We will guide you through the options best suited for your business.",
    },
    {
      icon: MapPin,
      title: "Registered Office Address",
      description:
        "Provide a UK registered office address. This is the official address for your company and will appear on the public register.",
    },
    {
      icon: Users,
      title: "Add Directors & Shareholders",
      description:
        "Provide details of your company directors and shareholders, including their personal information and share allocation.",
    },
    {
      icon: Briefcase,
      title: "Business Activity (SIC Codes)",
      description:
        "Describe your business activities using Standard Industrial Classification (SIC) codes. We will help you select the appropriate codes.",
    },
    {
      icon: CheckCircle2,
      title: "Review & Submit",
      description:
        "Review all your information carefully, then submit your application. We will process it and file with Companies House.",
    },
  ];

  const requirements = [
    "At least one director (must be 16 or over)",
    "At least one shareholder (can be the same person as the director)",
    "A UK registered office address",
    "Details of share capital and allocation",
    "Standard Industrial Classification (SIC) codes for your business activities",
    "Personal details including date of birth and nationality for directors",
  ];

  const timeline = [
    {
      icon: Clock,
      title: "Immediate",
      description: "Application submitted to our team for review",
    },
    {
      icon: FileText,
      title: "2-4 Hours",
      description: "Documents prepared and checked for accuracy",
    },
    {
      icon: Building2,
      title: "24-48 Hours",
      description: "Filed with Companies House and registration completed",
    },
    {
      icon: Shield,
      title: "Complete",
      description:
        "Certificate of Incorporation and company documents delivered",
    },
  ];

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How UK Company Formation Works
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process makes forming your UK company simple and
            stress-free. Here is everything you need to know.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold mb-8 text-center">
          The Formation Process
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {process.map((step, index) => (
            <Card key={step.title} className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">
                    Step {index + 1}
                  </span>
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">What You Will Need</h2>
            <p className="text-muted-foreground mb-6">
              Before starting your application, make sure you have the following
              information ready:
            </p>
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Expected Timeline</h2>
            <p className="text-muted-foreground mb-6">
              Here is what to expect after you submit your application:
            </p>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={item.title} className="flex gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="absolute top-12 left-6 w-0.5 h-12 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <Card className="bg-primary text-primary-foreground border-0">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              Our formation wizard will guide you through each step. The entire
              process takes about 15-20 minutes to complete.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/formation-wizard">Start Your Formation</Link>
            </Button>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
