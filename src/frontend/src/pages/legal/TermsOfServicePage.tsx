import Section from '@/components/Section';

export default function TermsOfServicePage() {
  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using UK Formations services, you agree to be bound by these Terms of Service
            and all applicable laws and regulations.
          </p>

          <h2>2. Services</h2>
          <p>
            UK Formations provides company formation services for UK companies. We act as an intermediary
            between you and Companies House to facilitate the registration process.
          </p>

          <h2>3. Your Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Pay all fees associated with your chosen package</li>
            <li>Notify us promptly of any changes to your information</li>
          </ul>

          <h2>4. Fees and Payment</h2>
          <p>
            All fees are stated on our pricing page and are subject to VAT. Payment is required before we
            begin processing your application. Fees are non-refundable once we have submitted your
            application to Companies House.
          </p>

          <h2>5. Processing Times</h2>
          <p>
            While we aim to complete formations within 24-48 hours, processing times may vary depending on
            Companies House workload. We are not responsible for delays caused by Companies House or
            circumstances beyond our control.
          </p>

          <h2>6. Rejection of Applications</h2>
          <p>
            Companies House may reject applications for various reasons, including unavailable company names
            or incomplete information. We will work with you to resolve any issues, but we cannot guarantee
            approval of your application.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            UK Formations provides formation services only. We do not provide legal, tax, or financial
            advice. You should consult appropriate professionals for such advice. Our liability is limited to
            the fees paid for our services.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, and software, is the property of UK
            Formations and is protected by copyright and other intellectual property laws.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately
            upon posting to our website. Your continued use of our services constitutes acceptance of any
            changes.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes will be subject to the
            exclusive jurisdiction of the courts of England and Wales.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at legal@ukformations.co.uk.
          </p>
        </div>
      </Section>
    </div>
  );
}

