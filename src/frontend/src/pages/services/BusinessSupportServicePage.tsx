import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Section from '@/components/Section';
import { getServicesByCategory } from '@/features/services/servicesCatalog';
import { CheckCircle2, Users, FileText, Briefcase, TrendingUp } from 'lucide-react';

export default function BusinessSupportServicePage() {
  const supportServices = getServicesByCategory('support');
  const complianceServices = getServicesByCategory('compliance');

  const benefits = [
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Professional support from experienced business advisors',
    },
    {
      icon: FileText,
      title: 'Compliance Management',
      description: 'Stay on top of all statutory requirements and deadlines',
    },
    {
      icon: Briefcase,
      title: 'Time Saving',
      description: 'Focus on growing your business while we handle the admin',
    },
    {
      icon: TrendingUp,
      title: 'Business Growth',
      description: 'Access services that help your business scale and succeed',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Business Support Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Comprehensive business support and compliance services to help your company thrive. From company secretarial services to VAT registration, we've got you covered.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Support Services?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let our experts handle the complexities of running a business so you can focus on what matters most.
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

      {/* Support Services Section */}
      <Section className="bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Business Support Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional services to support your business operations and growth.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {supportServices.map((service) => (
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

      {/* Compliance Services Section */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Compliance Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay compliant with HMRC and Companies House requirements.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {complianceServices.map((service) => (
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

      {/* CTA Section */}
      <Section className="bg-primary text-primary-foreground">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Let Us Support Your Business</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Get expert help with all aspects of running your UK business. Contact us today to discuss your needs.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
