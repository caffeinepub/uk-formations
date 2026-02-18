import Section from '@/components/Section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export default function FaqPage() {
  const faqs = [
    {
      question: 'How long does it take to form a UK company?',
      answer:
        'Most company formations are completed within 24-48 hours. Once you submit your application, we process it immediately and file with Companies House. You will receive your Certificate of Incorporation and company documents as soon as the registration is approved.',
    },
    {
      question: 'What is a registered office address?',
      answer:
        'A registered office address is the official address of your company. It must be a physical UK address (not a PO Box) and will appear on the public Companies House register. All official correspondence from Companies House and HMRC will be sent to this address.',
    },
    {
      question: 'Can I be both a director and shareholder?',
      answer:
        'Yes, absolutely. In fact, this is very common for small businesses and sole traders forming a limited company. You can be the only director and the only shareholder of your company.',
    },
    {
      question: 'What are SIC codes?',
      answer:
        'SIC (Standard Industrial Classification) codes are used to classify business activities. You need to provide at least one SIC code that describes what your company does. You can add up to four codes. Our wizard provides guidance on selecting the appropriate codes for your business.',
    },
    {
      question: 'Do I need a business bank account?',
      answer:
        'While not legally required to form a company, it is highly recommended to open a separate business bank account. This keeps your personal and business finances separate, making accounting and tax reporting much easier.',
    },
    {
      question: 'What is a Person with Significant Control (PSC)?',
      answer:
        'A PSC is anyone who owns more than 25% of shares or voting rights in your company, or has significant influence or control. All companies must maintain a PSC register, and this information is filed with Companies House.',
    },
    {
      question: 'Can I change my company name later?',
      answer:
        'Yes, you can change your company name at any time after formation. However, there is a fee for changing your company name with Companies House, so it is best to choose carefully from the start.',
    },
    {
      question: 'What documents will I receive?',
      answer:
        'After successful registration, you will receive your Certificate of Incorporation, Memorandum of Association, Articles of Association, and share certificates. The exact documents depend on the package you choose.',
    },
    {
      question: 'What if my chosen company name is not available?',
      answer:
        'If your first choice is not available, we will check your second and third preferences. That is why we ask for up to three name options. If none are available, we will contact you to discuss alternative names.',
    },
    {
      question: 'Do you provide ongoing support after formation?',
      answer:
        'Yes, depending on your chosen package, we offer various levels of ongoing support including registered office services, mail forwarding, and compliance reminders. Contact us to discuss your specific needs.',
    },
    {
      question: 'What is the difference between the packages?',
      answer:
        'Our Basic package includes essential formation services. The Standard package adds useful extras like digital document storage and priority processing. The Premium package includes everything plus ongoing support services like registered office address and compliance reminders.',
    },
    {
      question: 'Is my information secure?',
      answer:
        'Yes, we take data security very seriously. All information is transmitted securely and stored in compliance with UK data protection regulations. Some information (like director and shareholder details) will be publicly available on the Companies House register as required by law.',
    },
  ];

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about UK company formation. Can't find what you're looking for?
            Contact us for help.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our team is here to help. Get in touch and we will answer any questions you have about forming
            your UK company.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}

