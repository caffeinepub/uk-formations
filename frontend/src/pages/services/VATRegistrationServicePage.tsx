import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Section from '@/components/Section';
import { getServiceById } from '@/features/services/servicesCatalog';
import { CheckCircle2, Calculator, FileText, ShieldCheck, TrendingUp, BadgeCheck } from 'lucide-react';

export default function VATRegistrationServicePage() {
  const vatService = getServiceById('vat-registration');

  const benefits = [
    {
      icon: Calculator,
      title: 'Expert VAT Advice',
      description:
        'Our specialists assess your business to determine whether VAT registration is mandatory or beneficial for you.',
    },
    {
      icon: ShieldCheck,
      title: 'HMRC Liaison',
      description:
        'We handle all communication and submissions with HMRC on your behalf, ensuring accuracy and compliance.',
    },
    {
      icon: TrendingUp,
      title: 'Scheme Selection Support',
      description:
        'We help you choose the most tax-efficient VAT scheme — Standard, Flat Rate, or Cash Accounting — for your business.',
    },
    {
      icon: BadgeCheck,
      title: 'Fast VAT Number',
      description:
        'Receive your VAT registration number promptly so you can start trading and reclaiming VAT without delay.',
    },
  ];

  const vatSchemes = [
    {
      name: 'Standard VAT Scheme',
      description:
        'Charge VAT on sales and reclaim VAT on purchases. Ideal for businesses with significant VAT-able expenses.',
    },
    {
      name: 'Flat Rate Scheme',
      description:
        'Pay a fixed percentage of your turnover to HMRC. Simpler administration and often more cost-effective for small businesses.',
    },
    {
      name: 'Cash Accounting Scheme',
      description:
        'Only account for VAT when you receive or make payment. Helps with cash flow management for growing businesses.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-2">
            <Calculator className="h-4 w-4" />
            Compliance Services
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            VAT Registration
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Register your business for VAT with HMRC quickly and correctly. We assess your obligations,
            advise on the best VAT scheme, and handle the entire submission process on your behalf.
          </p>
          {vatService?.pricing && (
            <div className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg">
              <span className="text-3xl font-bold">£{vatService.pricing.amount.toFixed(2)}</span>
              <span className="text-sm ml-2 opacity-90">one-off fee</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button asChild size="lg">
              <Link to="/contact">Get Started Today</Link>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our VAT Registration Service?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigating VAT registration can be complex. Our experts make it straightforward and stress-free.
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

      {/* What's Included Section */}
      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Included</h2>
            <p className="text-lg text-muted-foreground">
              Our VAT registration service covers everything from initial assessment to receiving your VAT number.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Registration Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Assessment of mandatory vs voluntary registration requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Advice on the most suitable VAT scheme for your business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Preparation and submission of VAT1 application to HMRC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Liaison with HMRC throughout the registration process</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                <CardTitle>After Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>VAT registration number provided upon approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Guidance on VAT invoicing requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Advice on VAT return filing deadlines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Ongoing VAT compliance guidance and support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* VAT Schemes Section */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">VAT Scheme Options</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We help you choose the right VAT scheme to minimise your tax burden and simplify your accounting.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {vatSchemes.map((scheme) => (
            <Card key={scheme.name} className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">{scheme.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{scheme.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pricing Section */}
      {vatService && (
        <Section className="bg-muted/30">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground mb-8">
              One fixed fee covers the entire VAT registration process — no hidden charges.
            </p>
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{vatService.name}</CardTitle>
                <CardDescription className="text-base">{vatService.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-4">
                  <span className="text-5xl font-bold text-primary">
                    £{vatService.pricing?.amount.toFixed(2)}
                  </span>
                  <p className="text-muted-foreground mt-2">one-off fee, no hidden charges</p>
                </div>
                <ul className="space-y-3 text-left">
                  {vatService.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="w-full">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="bg-primary text-primary-foreground">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Register for VAT?</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Let our experts handle your VAT registration so you can focus on running your business.
            Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
