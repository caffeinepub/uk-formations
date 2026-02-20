import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Section from '@/components/Section';
import { getServicesByCategory } from '@/features/services/servicesCatalog';
import { CheckCircle2, MapPin, Mail, Shield, Building2 } from 'lucide-react';

export default function RegisteredOfficeServicePage() {
  const officeServices = getServicesByCategory('office');

  const benefits = [
    {
      icon: MapPin,
      title: 'Prestigious Address',
      description: 'Use a professional London or regional business address for your company',
    },
    {
      icon: Mail,
      title: 'Mail Handling',
      description: 'Secure mail forwarding and scanning services for all your correspondence',
    },
    {
      icon: Shield,
      title: 'Privacy Protection',
      description: 'Keep your home address private and protect your personal information',
    },
    {
      icon: Building2,
      title: 'Companies House Compliant',
      description: 'Fully compliant registered office address accepted by Companies House',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Registered Office Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Professional business addresses and mail handling solutions to give your company a prestigious presence while protecting your privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link to="/contact">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Use a Registered Office Service?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A registered office address is a legal requirement for all UK companies. Our service provides more than just an address.
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
                <CardDescription className="text-base">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Services Section */}
      <Section className="bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Office Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of registered office and business address services.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {officeServices.map((service) => (
            <Card key={service.id} className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {service.pricing && (
                  <div className="pt-4 border-t">
                    <p className="text-2xl font-bold text-primary">
                      £{service.pricing.amount.toFixed(2)}
                    </p>
                    {service.pricing.period && (
                      <p className="text-sm text-muted-foreground mt-1">{service.pricing.period}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* What's Included Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Included</h2>
            <p className="text-lg text-muted-foreground">
              Our registered office service includes everything you need to maintain a professional business presence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Registered Office Address</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Professional business address in prime location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Use for company registration and official documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Receive statutory mail and legal notices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Instant setup and activation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Mail Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Secure mail receipt and storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Regular mail forwarding to your chosen address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Scan and email service available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Notification of important correspondence</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-primary-foreground">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Get Your Professional Business Address Today</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Establish a professional presence for your company with our registered office service.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
