import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Check, Phone, PhoneCall, PhoneForwarded } from "lucide-react";

const plans = [
  {
    id: "call-answering",
    icon: PhoneCall,
    name: "With Call Answering",
    price: "£239.99",
    period: "per year",
    description:
      "A dedicated UK business number with a professional call answering service. Our team answers in your company name and forwards messages by email.",
    features: [
      "Dedicated UK business telephone number",
      "Professional call answering in your company name",
      "Messages forwarded to you by email",
      "Customised greeting script",
      "Call statistics reporting",
      "Instant activation",
    ],
  },
  {
    id: "number-forwarding",
    icon: PhoneForwarded,
    name: "Telephone Number Forwarding",
    price: "£10.41",
    period: "per month",
    description:
      "A dedicated UK business number that forwards all calls directly to your chosen mobile or landline number. Includes voicemail.",
    features: [
      "Dedicated UK business telephone number",
      "Call forwarding to any UK mobile or landline",
      "Voicemail included",
      "Simple online management",
      "Instant activation",
    ],
  },
];

export default function BusinessTelephoneServicePage() {
  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center mb-4">
            <Phone className="h-14 w-14 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Business Telephone Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Get a professional UK business telephone number for your company.
            Choose between a fully managed call answering service or simple
            number forwarding.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.id}
                className="border-2 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center pb-4">
                  <Icon className="h-10 w-10 text-primary mx-auto mb-3" />
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1">
                    {plan.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  <Button asChild className="w-full mt-4">
                    <Link to="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">
            Ready for a professional business number?
          </h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Both plans include a dedicated UK business number and instant
            activation.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
