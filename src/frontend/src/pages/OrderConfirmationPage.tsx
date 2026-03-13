import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import {
  type OrderConfirmation,
  loadConfirmation,
} from "../features/formationWizard/submitOrder";

export default function OrderConfirmationPage() {
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(
    null,
  );

  useEffect(() => {
    const loaded = loadConfirmation();
    setConfirmation(loaded);
  }, []);

  if (!confirmation) {
    return (
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <CardTitle>No Order Found</CardTitle>
              <CardDescription>
                We couldn't find your order confirmation. Please check your
                email for order details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link to="/">Return to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    );
  }

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for choosing UK Formations. Your company formation
            application has been received and is being processed.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Order Reference</CardTitle>
              <CardDescription>
                Please save this reference number for your records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-2">Order ID</p>
                <p className="text-4xl font-bold text-primary">
                  #{confirmation.orderId}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="font-semibold">Company Name</p>
                  <p className="text-sm text-muted-foreground">
                    {confirmation.companyName}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="font-semibold">Package</p>
                  <p className="text-sm text-muted-foreground">
                    {confirmation.packageName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£{confirmation.packagePrice}</p>
                  <p className="text-xs text-muted-foreground">+ VAT</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Submitted</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(confirmation.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      1
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">Email Confirmation</p>
                    <p className="text-sm text-muted-foreground">
                      You will receive an email confirmation with your order
                      details within the next few minutes.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      2
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">Application Review</p>
                    <p className="text-sm text-muted-foreground">
                      Our team will review your application and prepare the
                      necessary documents for Companies House.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      3
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">Companies House Filing</p>
                    <p className="text-sm text-muted-foreground">
                      We will file your application with Companies House. This
                      typically takes 24-48 hours.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      4
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">Documents Delivered</p>
                    <p className="text-sm text-muted-foreground">
                      Once approved, you will receive your Certificate of
                      Incorporation and all company documents via email.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you have any questions about your application, please don't
                hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href="mailto:info@ukformations.co.uk"
                    className="hover:underline"
                  >
                    info@ukformations.co.uk
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+442012345678" className="hover:underline">
                    +44 20 1234 5678
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link to="/">Return to Home</Link>
            </Button>
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
