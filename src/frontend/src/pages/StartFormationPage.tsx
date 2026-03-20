import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useCheckNameAvailability } from "@/hooks/useQueries";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Loader2,
  Lock,
  Search,
  Shield,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { packages } from "../features/packages/packagesCatalog";
import { useCreateCheckoutSession } from "../hooks/useCheckoutSession";

const STEPS = [
  { id: "name", title: "Choose Name", description: "Check availability" },
  { id: "package", title: "Choose Package", description: "Select your plan" },
  { id: "checkout", title: "Checkout", description: "Secure payment" },
];

export default function StartFormationPage() {
  const checkoutMutation = useCreateCheckoutSession();

  const [currentStep, setCurrentStep] = useState(0);
  const [chosenName, setChosenName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(
    null,
  );

  const {
    data: nameResult,
    isLoading: nameLoading,
    isError: nameError,
  } = useCheckNameAvailability(chosenName, hasSearched);

  const handleNameSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setChosenName(trimmed);
    setHasSearched(true);
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (hasSearched && e.target.value.trim() !== chosenName) {
      setHasSearched(false);
    }
  };

  const canProceedFromStep1 =
    hasSearched && !nameLoading && !nameError && nameResult?.isAvailable;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePayNow = async () => {
    const pkg = packages.find((p) => p.id === selectedPackageId);
    if (!pkg) return;

    const items = [
      {
        productName: `${pkg.name} Company Formation Package`,
        currency: "gbp",
        quantity: BigInt(1),
        priceInCents: BigInt(Math.round(pkg.price * 100)),
        productDescription: pkg.description,
      },
    ];

    try {
      const session = await checkoutMutation.mutateAsync(items);
      sessionStorage.setItem(
        "paymentSession",
        JSON.stringify({
          token: session.id,
          packageId: selectedPackageId,
          companyName: chosenName,
          packageName: pkg.name,
          packagePrice: pkg.price,
          timestamp: Date.now(),
        }),
      );
      window.location.href = session.url;
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Failed to start checkout. Please try again.");
    }
  };

  const selectedPackage = packages.find((p) => p.id === selectedPackageId);
  const packageLocked = !selectedPackageId;
  const vatAmount = selectedPackage ? selectedPackage.price * 0.2 : 0;
  const totalAmount = selectedPackage ? selectedPackage.price + vatAmount : 0;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Start Your Company Formation
            </h1>
            <p className="text-muted-foreground">
              Step {currentStep + 1} of {STEPS.length}:{" "}
              {STEPS[currentStep].title}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {STEPS.map((step, index) => {
                const isLocked = index >= 2 && packageLocked;
                return (
                  <div
                    key={step.id}
                    className={`text-center ${
                      isLocked
                        ? "text-muted-foreground/30"
                        : index === currentStep
                          ? "text-primary font-semibold"
                          : index < currentStep
                            ? "text-muted-foreground"
                            : "text-muted-foreground/50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm mb-1 ${
                        isLocked
                          ? "bg-muted/40 text-muted-foreground/30 border border-dashed border-muted-foreground/20"
                          : index === currentStep
                            ? "bg-primary text-primary-foreground"
                            : index < currentStep
                              ? "bg-primary/20 text-primary"
                              : "bg-muted"
                      }`}
                    >
                      {isLocked ? (
                        <Lock className="h-3.5 w-3.5" />
                      ) : index < currentStep ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <p
                      className={`text-xs hidden sm:block ${
                        isLocked ? "opacity-30" : ""
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{STEPS[currentStep].title}</CardTitle>
              <CardDescription>
                {STEPS[currentStep].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Name Check */}
              {currentStep === 0 && (
                <div className="space-y-6" data-ocid="name_check.panel">
                  <p className="text-muted-foreground">
                    Enter your desired company name to check if it's available
                    on Companies House. You cannot register a name that's
                    already taken.
                  </p>
                  <form onSubmit={handleNameSearch} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="company-name"
                        className="text-base font-semibold"
                      >
                        Desired Company Name
                      </Label>
                      <div className="flex gap-3">
                        <Input
                          id="company-name"
                          type="text"
                          placeholder="e.g. Acme Trading Limited"
                          value={inputValue}
                          onChange={handleNameInputChange}
                          className="flex-1 h-12 text-base"
                          autoComplete="off"
                          data-ocid="name_check.input"
                        />
                        <Button
                          type="submit"
                          size="lg"
                          disabled={nameLoading || !inputValue.trim()}
                          className="shrink-0"
                          data-ocid="name_check.primary_button"
                        >
                          {nameLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Checking...
                            </>
                          ) : (
                            <>
                              <Search className="h-4 w-4 mr-2" />
                              Check
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Include a suffix like "Limited" or "Ltd" for a private
                        limited company.
                      </p>
                    </div>
                  </form>

                  {hasSearched && !nameLoading && (
                    <div className="mt-4">
                      {nameError ? (
                        <div
                          className="flex items-start gap-4 p-5 rounded-lg border-2 border-destructive/40 bg-destructive/5"
                          data-ocid="name_check.error_state"
                        >
                          <XCircle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-destructive">
                              Check Failed
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Unable to complete the name check. Please try
                              again.
                            </p>
                          </div>
                        </div>
                      ) : nameResult?.isAvailable ? (
                        <div
                          className="flex items-start gap-4 p-5 rounded-lg border-2 border-blue-500/40 bg-blue-50 dark:bg-blue-950/20"
                          data-ocid="name_check.success_state"
                        >
                          <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-blue-700 dark:text-blue-400">
                              Name Available!
                            </p>
                            <p className="text-sm text-blue-700/80 dark:text-blue-400/80 mt-1">
                              {nameResult.message}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Great — you can proceed with{" "}
                              <strong>{chosenName}</strong> for your formation.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="flex items-start gap-4 p-5 rounded-lg border-2 border-amber-500/40 bg-amber-50 dark:bg-amber-950/20"
                          data-ocid="name_check.error_state"
                        >
                          <XCircle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-amber-700 dark:text-amber-400">
                              Name Unavailable
                            </p>
                            <p className="text-sm text-amber-700/80 dark:text-amber-400/80 mt-1">
                              {nameResult?.message}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Try adding a unique word, location, or descriptor
                              to make it distinct.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Package Selection */}
              {currentStep === 1 && (
                <div className="space-y-4" data-ocid="package_select.panel">
                  <p className="text-muted-foreground">
                    Choose the formation package that best suits your business
                    needs. All packages include Companies House registration.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {packages.map((pkg, idx) => (
                      <div key={pkg.id} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className={`relative text-left rounded-t-lg border-2 p-4 transition-all ${
                            selectedPackageId === pkg.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          data-ocid={`package_select.item.${idx + 1}`}
                        >
                          {pkg.popular && (
                            <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs">
                              Most Popular
                            </Badge>
                          )}
                          <div className="mb-3">
                            <p className="font-semibold text-base">
                              {pkg.name}
                            </p>
                            <p className="text-2xl font-bold text-primary">
                              £{pkg.price}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              + VAT
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {pkg.description}
                          </p>
                          {selectedPackageId === pkg.id && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            </div>
                          )}
                        </button>
                        {/* Collapsible feature list */}
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedPackageId(
                              expandedPackageId === pkg.id ? null : pkg.id,
                            )
                          }
                          className={`text-xs border-2 border-t-0 rounded-b-lg px-4 py-2 flex items-center justify-between transition-colors ${
                            selectedPackageId === pkg.id
                              ? "border-primary bg-primary/5 text-primary hover:bg-primary/10"
                              : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                          data-ocid={`package_select.toggle.${idx + 1}`}
                        >
                          <span>
                            {expandedPackageId === pkg.id
                              ? "Hide features"
                              : "View features"}
                          </span>
                          <ChevronRight
                            className={`h-3 w-3 transition-transform ${
                              expandedPackageId === pkg.id ? "rotate-90" : ""
                            }`}
                          />
                        </button>
                        {expandedPackageId === pkg.id && (
                          <div className="border-2 border-t-0 border-border rounded-b-lg px-4 py-3 bg-muted/30">
                            <ul className="space-y-1.5">
                              {pkg.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-start gap-2 text-xs"
                                >
                                  <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {!selectedPackageId && (
                    <div
                      className="flex items-start gap-3 mt-2 p-4 rounded-lg border border-amber-400/50 bg-amber-50 dark:bg-amber-950/25"
                      data-ocid="package_select.error_state"
                    >
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                          Please select a package above to continue.
                        </p>
                        <p className="text-xs text-amber-700/70 dark:text-amber-400/70 mt-0.5">
                          You must choose a formation package before you can
                          proceed to checkout.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Checkout */}
              {currentStep === 2 && selectedPackage && (
                <div data-ocid="checkout.panel">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Order Summary</h3>

                      {/* Company Name */}
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <p className="text-xs text-muted-foreground mb-1">
                          Company Name
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{chosenName}</p>
                          <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="h-3 w-3" /> Verified
                          </span>
                        </div>
                      </div>

                      {/* Package */}
                      <div className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold">
                            {selectedPackage.name} Package
                          </p>
                          {selectedPackage.popular && (
                            <Badge variant="secondary" className="text-xs">
                              Most Popular
                            </Badge>
                          )}
                        </div>
                        <ul className="space-y-1.5 mt-3">
                          {selectedPackage.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-sm"
                            >
                              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price Breakdown */}
                      <div className="p-4 rounded-lg border">
                        <h4 className="font-semibold text-sm mb-3">
                          Price Breakdown
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {selectedPackage.name} Package
                            </span>
                            <span>£{selectedPackage.price.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              VAT (20%)
                            </span>
                            <span>£{vatAmount.toFixed(2)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span className="text-primary text-lg">
                              £{totalAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold text-lg">
                          Secure Checkout
                        </h3>
                      </div>

                      {/* Trust Badges */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30">
                          <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                          <span className="text-xs text-muted-foreground">
                            256-bit SSL Encrypted
                          </span>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30">
                          <Shield className="h-4 w-4 text-blue-600 shrink-0" />
                          <span className="text-xs text-muted-foreground">
                            Secure Payment
                          </span>
                        </div>
                      </div>

                      {/* What Happens Next */}
                      <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                        <p className="text-sm font-semibold mb-2">
                          What happens next?
                        </p>
                        <ol className="space-y-1.5 text-sm text-muted-foreground">
                          <li className="flex gap-2">
                            <span className="text-primary font-semibold">
                              1.
                            </span>{" "}
                            Complete secure payment
                          </li>
                          <li className="flex gap-2">
                            <span className="text-primary font-semibold">
                              2.
                            </span>{" "}
                            Fill in your company formation details
                          </li>
                          <li className="flex gap-2">
                            <span className="text-primary font-semibold">
                              3.
                            </span>{" "}
                            We submit to Companies House
                          </li>
                          <li className="flex gap-2">
                            <span className="text-primary font-semibold">
                              4.
                            </span>{" "}
                            Receive your Certificate of Incorporation
                          </li>
                        </ol>
                      </div>

                      {/* Summary before payment */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              You're paying
                            </p>
                            <p className="text-2xl font-bold text-primary">
                              £{totalAmount.toFixed(2)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              inc. VAT
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {selectedPackage.name} Package
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {chosenName}
                            </p>
                          </div>
                        </div>
                      </div>

                      {checkoutMutation.isError && (
                        <div
                          className="flex items-start gap-3 p-3 rounded-lg border border-destructive/40 bg-destructive/5"
                          data-ocid="checkout.error_state"
                        >
                          <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                          <p className="text-sm text-destructive">
                            Payment failed. Please try again or contact support.
                          </p>
                        </div>
                      )}

                      <Button
                        size="lg"
                        className="w-full h-12 text-base"
                        onClick={handlePayNow}
                        disabled={checkoutMutation.isPending}
                        data-ocid="checkout.primary_button"
                      >
                        {checkoutMutation.isPending ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-5 w-5 mr-2" />
                            Pay Now — £{totalAmount.toFixed(2)}
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        By clicking Pay Now you agree to our{" "}
                        <a
                          href="/terms"
                          className="underline hover:text-foreground"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="/privacy"
                          className="underline hover:text-foreground"
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          {currentStep < 2 && (
            <div className="flex justify-between mb-8">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={currentStep === 0}
                data-ocid="formation_flow.secondary_button"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === 0 && !canProceedFromStep1) ||
                  (currentStep === 1 && !selectedPackageId)
                }
                className={`transition-opacity ${
                  currentStep === 1 && !selectedPackageId
                    ? "opacity-40 cursor-not-allowed"
                    : ""
                }`}
                data-ocid="formation_flow.primary_button"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex justify-between mb-8">
              <Button
                onClick={handleBack}
                variant="outline"
                data-ocid="formation_flow.secondary_button"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
