import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Section from '@/components/Section';
import { CheckCircle2, Clock, Shield, FileText, Users, Building2 } from 'lucide-react';

export default function HomePage() {
  const benefits = [
    {
      icon: Clock,
      title: 'Fast Processing',
      description: 'Get your company registered within 24-48 hours',
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Fully compliant with Companies House regulations',
    },
    {
      icon: FileText,
      title: 'Complete Documentation',
      description: 'All necessary documents prepared and filed',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Dedicated support throughout the process',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Choose Your Package',
      description: 'Select the formation package that suits your needs',
    },
    {
      number: '02',
      title: 'Provide Details',
      description: 'Complete our simple online formation wizard',
    },
    {
      number: '03',
      title: 'Review & Submit',
      description: 'Review your information and submit your application',
    },
    {
      number: '04',
      title: 'Get Registered',
      description: 'Receive your company registration documents',
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
              Professional company formation services that make starting your UK business simple, fast, and
              hassle-free. Get registered with Companies House in as little as 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/formation-wizard">Start Your Formation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/pricing">View Packages</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Companies House Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">24-48 Hour Processing</span>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose UK Formations?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make company formation straightforward with our expert service and comprehensive support.
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

      {/* How It Works Section */}
      <Section className="bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to get your UK company registered and ready for business.
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
            <Link to="/how-it-works">Learn More</Link>
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <Card className="bg-primary text-primary-foreground border-0">
          <CardHeader className="text-center space-y-4 pb-8">
            <Building2 className="h-16 w-16 mx-auto" />
            <CardTitle className="text-3xl md:text-4xl">Ready to Start Your Business?</CardTitle>
            <CardDescription className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have successfully formed their UK companies with our service.
              Get started today and have your company registered within 48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-8">
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link to="/formation-wizard">Begin Your Formation Now</Link>
            </Button>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}

