import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Check, Mail, MapPin, Shield, X } from "lucide-react";

const addressPlans = [
  {
    id: "registered-office",
    name: "Registered Office",
    price: 44.99,
    period: "per year",
    popular: false,
    description: "Essential registered office address for Companies House",
    features: {
      "Registered Office Address": true,
      "Free Mail Forwarding": true,
      "Free Scan and Email": true,
      "Free Mail Collection": true,
      "Mail Sorted Daily": true,
      "Unlimited Directors Service Address": false,
      "Business Mail Forwarding": false,
    },
  },
  {
    id: "registered-office-plus",
    name: "Registered Office+",
    price: 59.99,
    period: "per year",
    popular: true,
    description: "Registered office plus unlimited directors service address",
    features: {
      "Registered Office Address": true,
      "Free Mail Forwarding": true,
      "Free Scan and Email": true,
      "Free Mail Collection": true,
      "Mail Sorted Daily": true,
      "Unlimited Directors Service Address": true,
      "Business Mail Forwarding": false,
    },
  },
  {
    id: "mailing-address",
    name: "Mailing Address",
    price: 169.99,
    period: "per year",
    popular: false,
    description: "Full mailing address with business mail forwarding",
    features: {
      "Registered Office Address": false,
      "Free Mail Forwarding": true,
      "Free Scan and Email": true,
      "Free Mail Collection": true,
      "Mail Sorted Daily": true,
      "Unlimited Directors Service Address": false,
      "Business Mail Forwarding": true,
    },
  },
  {
    id: "virtual-office",
    name: "Virtual Office",
    price: 199.99,
    period: "per year",
    popular: false,
    description: "Complete virtual office with all address and mail services",
    features: {
      "Registered Office Address": true,
      "Free Mail Forwarding": true,
      "Free Scan and Email": true,
      "Free Mail Collection": true,
      "Mail Sorted Daily": true,
      "Unlimited Directors Service Address": true,
      "Business Mail Forwarding": true,
    },
  },
];

const featureKeys = [
  "Registered Office Address",
  "Free Mail Forwarding",
  "Free Scan and Email",
  "Free Mail Collection",
  "Mail Sorted Daily",
  "Unlimited Directors Service Address",
  "Business Mail Forwarding",
];

const benefits = [
  {
    icon: MapPin,
    title: "London Address",
    description:
      "Prestigious London business address accepted by Companies House",
  },
  {
    icon: Mail,
    title: "Mail Handling",
    description:
      "Secure mail collection, forwarding and scan-to-email services",
  },
  {
    icon: Shield,
    title: "Privacy Protection",
    description:
      "Keep your home address off the public Companies House register",
  },
];

export default function AddressServicesPage() {
  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Address Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Professional London business addresses and mail handling solutions.
            Keep your home address private and maintain a prestigious company
            presence.
          </p>
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((b) => (
            <Card key={b.title} className="border-2 text-center p-6">
              <b.icon className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.description}</p>
            </Card>
          ))}
        </div>

        {/* Desktop comparison table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 font-semibold text-sm w-1/3">
                  Features
                </th>
                {addressPlans.map((plan) => (
                  <th key={plan.id} className="p-4 text-center">
                    <div className="space-y-1">
                      {plan.popular && (
                        <Badge className="text-xs mx-auto block w-fit">
                          Most Popular
                        </Badge>
                      )}
                      <p className="font-bold text-base">{plan.name}</p>
                      <p className="text-2xl font-bold text-primary">
                        £{plan.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {plan.period}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureKeys.map((feature, i) => (
                <tr key={feature} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                  <td className="p-4 text-sm">{feature}</td>
                  {addressPlans.map((plan) => (
                    <td key={plan.id} className="p-4 text-center">
                      {plan.features[feature as keyof typeof plan.features] ? (
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4" />
                {addressPlans.map((plan) => (
                  <td key={plan.id} className="p-4 text-center">
                    <Button
                      asChild
                      size="sm"
                      variant={plan.popular ? "default" : "outline"}
                      className="w-full"
                    >
                      <Link to="/contact">Get Started</Link>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-6">
          {addressPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`border-2 ${plan.popular ? "border-primary shadow-lg" : ""}`}
            >
              <CardHeader className="text-center">
                {plan.popular && (
                  <Badge className="mx-auto w-fit mb-2">Most Popular</Badge>
                )}
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
                <p className="text-3xl font-bold text-primary">
                  £{plan.price.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">{plan.period}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {featureKeys.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <span className="text-sm">{feature}</span>
                    {plan.features[feature as keyof typeof plan.features] ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/40" />
                    )}
                  </div>
                ))}
                <Button
                  asChild
                  className="w-full mt-4"
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link to="/contact">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">
            Need a professional address today?
          </h2>
          <p className="text-lg opacity-90">
            All plans include a prestigious London address and full mail
            handling.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
