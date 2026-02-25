import Section from '@/components/Section';

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how UK Formations ("we", "us", or "our") collects, uses, and
            protects your personal information when you use our company formation services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Personal identification information (name, date of birth, nationality)</li>
            <li>Contact information (email address, phone number, address)</li>
            <li>Company formation details (company name, business activities, shareholding structure)</li>
            <li>Payment information (processed securely through third-party payment providers)</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process your company formation application</li>
            <li>File required documents with Companies House</li>
            <li>Communicate with you about your application</li>
            <li>Provide customer support</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Information Sharing</h2>
          <p>
            We share your information with Companies House as required by law for company registration. Some
            information will become publicly available on the Companies House register. We do not sell your
            personal information to third parties.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal
            information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>6. Your Rights</h2>
          <p>Under UK data protection law, you have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information (subject to legal requirements)</li>
            <li>Object to processing of your information</li>
            <li>Request transfer of your information</li>
          </ul>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us at
            privacy@ukformations.co.uk.
          </p>
        </div>
      </Section>
    </div>
  );
}

