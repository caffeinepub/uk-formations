import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { Building2, CheckCircle2, ChevronRight, Package } from "lucide-react";
import { useEffect, useRef } from "react";
import { packages } from "../features/packages/packagesCatalog";
import { saveOrder } from "../utils/orderHistory";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const savedRef = useRef(false);

  let session: {
    token?: string;
    packageId?: string;
    companyName?: string;
    timestamp?: number;
  } | null = null;
  try {
    const raw = sessionStorage.getItem("paymentSession");
    if (raw) session = JSON.parse(raw);
  } catch {
    // ignore
  }

  const selectedPackage = session?.packageId
    ? packages.find((p) => p.id === session?.packageId)
    : null;

  useEffect(() => {
    if (savedRef.current || !session) return;
    savedRef.current = true;
    saveOrder({
      id: session.token ?? crypto.randomUUID(),
      companyName: session.companyName ?? "Unknown Company",
      packageSelected:
        selectedPackage?.name ?? session.packageId ?? "Unknown Package",
      serviceType: "Company Formation",
      date: new Date().toISOString(),
      amountPaid: selectedPackage ? selectedPackage.price * 1.2 : 0,
      status: "completed",
    });
  }, [session, selectedPackage]);

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-lg mx-auto py-12">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
              data-ocid="payment_success.panel"
            >
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Your payment has been processed. You can now complete your company
              formation.
            </p>
          </div>

          {session && (
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Order Details
                </h3>
                {session.companyName && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Company Name
                      </p>
                      <p className="font-semibold">{session.companyName}</p>
                    </div>
                  </div>
                )}
                {selectedPackage && (
                  <>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Package</p>
                        <p className="font-semibold">{selectedPackage.name}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Amount Paid (inc. VAT)
                      </span>
                      <span className="font-bold text-primary text-lg">
                        £{(selectedPackage.price * 1.2).toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 mb-6">
            <p className="text-sm font-semibold mb-2">Next Steps</p>
            <ol className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-semibold">1.</span> Click
                "Continue to Formation" below
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">2.</span> Fill in
                your company directors and shareholders
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">3.</span> Review
                and submit your application
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">4.</span> Receive
                your Certificate of Incorporation
              </li>
            </ol>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate({ to: "/formation-wizard" })}
            data-ocid="payment_success.primary_button"
          >
            Continue to Formation
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Section>
    </div>
  );
}
