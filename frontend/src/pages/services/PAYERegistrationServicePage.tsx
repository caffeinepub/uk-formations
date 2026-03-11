import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Section from '@/components/Section';
import { getServiceById } from '@/features/services/servicesCatalog';
import { CheckCircle2, Users, FileText, ShieldCheck, Briefcase, BadgeCheck } from 'lucide-react';

export default function PAYERegistrationServicePage() {
  const payeService = getServiceById('paye-registration');

  const benefits = [
    {
      icon: Users,
      title: 'Employer Registration',
      description:
        'We register your business as an employer with HMRC, ensuring you are fully set up to pay employees legally.',
    },
    {
      icon: ShieldCheck,
      title: 'PAYE Compliance',
      description:
        'Stay compliant with all PAYE obligations including income tax deductions and National Insurance contributions.',
    },
    {
      icon: Briefcase,
      title: 'Payroll Setup Support',
      description:
        'Receive expert guidance on setting up your payroll system and understanding your employer responsibilities.',
    },
    {
      icon: BadgeCheck,
      title: 'Employer Reference',
      description:
        'Obtain your unique employer PAYE reference number required for all payroll and HMRC correspondence.',
    },
  ];

  const payeSteps = [
    {
      step: '01',
      title: 'Initial Assessment',
      description:
        'We review your business structure and employment plans to confirm PAYE registration requirements.',
    },
    {
      step: '02',
      title: 'HMRC Registration',
      description:
        'We complete and submit your employer PAYE scheme registration to HMRC on your behalf.',
    },
    {
      step: '03',
      title: 'Reference Number',
      description:
        'You receive your employer PAYE reference number and Accounts Office reference from HMRC.',
    },
    {
      step: '04',
      title: 'Payroll Guidance',
      description:
        'We provide guidance on running payroll, RTI submissions, and ongoing PAYE compliance obligations.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-2">
            <Users className="h-4 w-4" />
            Compliance Services
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            PAYE Registration
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Register as an employer with HMRC and set up your PAYE scheme correctly from day one.
            We handle the full registration process, provide your employer reference number, and guide
            you through National Insurance and income tax setup.
          </p>
          {payeService?.pricing && (
            <div className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg">
              <span className="text-3xl font-bold">£{payeService.pricing.amount.toFixed(2)}</span>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our PAYE Registration Service?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Setting up PAYE correctly is essential for any employer. Our experts ensure a smooth, compliant registration.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our PAYE Registration Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple four-step process to get your employer PAYE scheme up and running.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {payeSteps.map((item) => (
            <div key={item.step} className="relative">
              <Card className="border-2 h-full">
                <CardHeader>
                  <div className="text-4xl font-bold text-primary/20 mb-2">{item.step}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* What's Included Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Included</h2>
            <p className="text-lg text-muted-foreground">
              Our PAYE registration service covers everything you need to become a compliant employer.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Registration & Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Employer PAYE scheme registration with HMRC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Employer reference number provision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Accounts Office reference number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Full HMRC liaison throughout the process</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Compliance Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>National Insurance setup and contribution guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Income tax deduction setup and configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Real Time Information (RTI) submission guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Payroll compliance advisory and best practices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Pricing Section */}
      {payeService && (
        <Section className="bg-muted/30">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground mb-8">
              One fixed fee covers the entire PAYE registration process — no hidden charges.
            </p>
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{payeService.name}</CardTitle>
                <CardDescription className="text-base">{payeService.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-4">
                  <span className="text-5xl font-bold text-primary">
                    £{payeService.pricing?.amount.toFixed(2)}
                  </span>
                  <p className="text-muted-foreground mt-2">one-off fee, no hidden charges</p>
                </div>
                <ul className="space-y-3 text-left">
                  {payeService.features.map((feature, index) => (
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
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Register as an Employer?</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Let our experts handle your PAYE registration so you can start paying your employees
            correctly and compliantly. Contact us today for a free consultation.
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
