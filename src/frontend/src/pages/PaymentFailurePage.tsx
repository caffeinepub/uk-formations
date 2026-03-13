import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { RefreshCw, XCircle } from "lucide-react";

export default function PaymentFailurePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-lg mx-auto py-16 text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6"
            data-ocid="payment_failure.panel"
          >
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Payment Unsuccessful</h1>
          <p className="text-muted-foreground mb-6">
            Your payment could not be processed. Please try again or use a
            different payment method.
          </p>

          <div className="p-4 rounded-lg border border-amber-400/40 bg-amber-50 dark:bg-amber-950/20 mb-8 text-left">
            <p className="text-sm text-amber-700 dark:text-amber-400">
              <strong>Common reasons for failure:</strong> insufficient funds,
              incorrect card details, or card blocked by your bank. Contact your
              bank if the problem persists.
            </p>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate({ to: "/start-formation" })}
            data-ocid="payment_failure.primary_button"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </Section>
    </div>
  );
}
