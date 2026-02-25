import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Section from '@/components/Section';
import ServiceComparisonTable from '@/components/services/ServiceComparisonTable';
import { getServicesByCategory } from '@/features/services/servicesCatalog';
import { CheckCircle2, Clock, Shield, FileText } from 'lucide-react';

export default function CompanyFormationServicePage() {
  const formationServices = getServicesByCategory('formation');

  const benefits = [
    {
      icon: Clock,
      title: 'Fast Registration',
      description: 'Get your company registered within 24-48 hours with our expedited service',
    },
    {
      icon: Shield,
      title: 'Fully Compliant',
      description: 'All formations are fully compliant with Companies House regulations',
    },
    {
      icon: FileText,
      title: 'Complete Documentation',
      description: 'Receive all necessary incorporation documents and certificates',
    },
    {
      icon: CheckCircle2,
      title: 'Expert Support',
      description: 'Dedicated support team to guide you through the entire process',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Company Formation Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Professional UK company registration services for limited companies, LLPs, and more. Fast, reliable, and fully compliant with Companies House.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link to="/formation-wizard">Start Your Formation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/pricing">View Packages</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Formation Service?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make company formation simple, fast, and stress-free with our comprehensive service.
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

      {/* Package Comparison */}
      <Section className="bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare Our Packages</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the package that best suits your business needs and budget.
          </p>
        </div>
        <ServiceComparisonTable />
      </Section>

      {/* Formation Types */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Formation Types We Offer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We support all major UK business structures to suit your specific needs.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {formationServices.map((service) => (
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
                    {service.pricing.note && (
                      <p className="text-sm text-muted-foreground mt-1">{service.pricing.note}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-primary-foreground">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Form Your Company?</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Start your company formation today and get your business up and running in as little as 24 hours.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/formation-wizard">Get Started Now</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
