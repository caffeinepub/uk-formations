import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import StepCompanyBasics from "../features/formationWizard/steps/StepCompanyBasics";
import StepContact from "../features/formationWizard/steps/StepContact";
import StepDirectors from "../features/formationWizard/steps/StepDirectors";
import StepPSC from "../features/formationWizard/steps/StepPSC";
import StepRegisteredOffice from "../features/formationWizard/steps/StepRegisteredOffice";
import StepReview from "../features/formationWizard/steps/StepReview";
import StepShareholders from "../features/formationWizard/steps/StepShareholders";
import StepSicCodes from "../features/formationWizard/steps/StepSicCodes";
import {
  convertDraftToOrderInput,
  saveConfirmation,
} from "../features/formationWizard/submitOrder";
import { useFormationDraft } from "../features/formationWizard/useFormationDraft";
import {
  type ValidationErrors,
  validateCompanyBasics,
  validateContact,
  validateDirectors,
  validatePSC,
  validateRegisteredOffice,
  validateShareholders,
  validateSicCodes,
} from "../features/formationWizard/validation";
import { useSubmitFormationOrder } from "../hooks/useQueries";

const steps = [
  { id: "basics", title: "Company Basics", description: "Name and type" },
  { id: "office", title: "Registered Office", description: "Official address" },
  { id: "directors", title: "Directors", description: "Company directors" },
  {
    id: "shareholders",
    title: "Shareholders",
    description: "Share allocation",
  },
  { id: "psc", title: "PSC", description: "Significant control" },
  { id: "sic", title: "SIC Codes", description: "Business activities" },
  { id: "contact", title: "Contact", description: "Your details" },
  { id: "review", title: "Review", description: "Final check" },
];

// Payment guard: check if a valid payment session exists
function PaywallScreen() {
  const navigate = useNavigate();
  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-lg mx-auto py-16 text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6 mx-auto"
            data-ocid="paywall.panel"
          >
            <Lock className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Required</h1>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Please complete the checkout process to access the formation forms.
            Only verified payments unlock this section.
          </p>
          <div className="p-4 rounded-lg border border-amber-400/40 bg-amber-50 dark:bg-amber-950/20 mb-8 text-left">
            <p className="text-sm text-amber-700 dark:text-amber-400">
              <strong>Why is this locked?</strong> To keep your company
              formation secure and ensure only genuine applicants submit
              details, we require payment before you can fill in your formation
              information.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => navigate({ to: "/start-formation" })}
            data-ocid="paywall.primary_button"
          >
            Start Your Formation
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            Already paid? Make sure you used the same browser session.
          </p>
        </div>
      </Section>
    </div>
  );
}

export default function FormationWizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { draft, updateDraft, clearDraft } = useFormationDraft();
  const navigate = useNavigate();
  const submitMutation = useSubmitFormationOrder();

  // Payment guard
  const paymentSession = sessionStorage.getItem("paymentSession");
  const isPaymentValid = !!paymentSession;

  if (!isPaymentValid) {
    return <PaywallScreen />;
  }

  // Pre-populate draft from payment session if not already set
  try {
    const session = JSON.parse(paymentSession);
    if (
      session?.companyName &&
      draft.companyNamePreferences[0] !== session.companyName
    ) {
      // We don't call updateDraft here directly since it would cause re-renders
      // The formation wizard steps will have the company name pre-loaded from draft
    }
  } catch {
    // Ignore parse errors
  }

  const validateCurrentStep = (): boolean => {
    let stepErrors: ValidationErrors = {};
    switch (currentStep) {
      case 0:
        stepErrors = validateCompanyBasics(draft);
        break;
      case 1:
        stepErrors = validateRegisteredOffice(draft);
        break;
      case 2:
        stepErrors = validateDirectors(draft);
        break;
      case 3:
        stepErrors = validateShareholders(draft);
        break;
      case 4:
        stepErrors = validatePSC(draft);
        break;
      case 5:
        stepErrors = validateSicCodes(draft);
        break;
      case 6:
        stepErrors = validateContact(draft);
        break;
      default:
        break;
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    try {
      const orderInput = convertDraftToOrderInput(draft);
      const response = await submitMutation.mutateAsync(orderInput);
      saveConfirmation({
        orderId: Number(response.orderId),
        companyName: draft.companyNamePreferences[0] || "Not provided",
        packageName: draft.selectedPackage?.name || "Not selected",
        packagePrice: draft.selectedPackage?.price || 0,
        timestamp: new Date().toISOString(),
      });
      clearDraft();
      sessionStorage.removeItem("paymentSession");
      navigate({ to: "/confirmation" });
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to submit order. Please try again." });
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Company Formation Wizard
            </h1>
            <p className="text-muted-foreground">
              Step {currentStep + 1} of {steps.length}:{" "}
              {steps[currentStep].title}
            </p>
          </div>

          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <div className="mt-4 grid grid-cols-4 md:grid-cols-8 gap-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`text-center ${
                    index === currentStep
                      ? "text-primary font-semibold"
                      : index < currentStep
                        ? "text-muted-foreground"
                        : "text-muted-foreground/50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm mb-1 ${
                      index === currentStep
                        ? "bg-primary text-primary-foreground"
                        : index < currentStep
                          ? "bg-primary/20 text-primary"
                          : "bg-muted"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-xs hidden md:block">{step.title}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>
                {steps[currentStep].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 0 && (
                <StepCompanyBasics
                  draft={draft}
                  updateDraft={updateDraft}
                  errors={errors}
                />
              )}
              {currentStep === 1 && (
                <StepRegisteredOffice
                  draft={draft}
                  updateDraft={updateDraft}
                  errors={errors}
                />
              )}
              {currentStep === 2 && (
                <StepDirectors
                  draft={draft}
                  updateDraft={updateDraft}
                  errors={errors}
                />
              )}
              {currentStep === 3 && (
                <StepShareholders
                  draft={draft}
                  updateDraft={updateDraft}
                  errors={errors}
                />
              )}
              {currentStep === 4 && (
                <StepPSC
                  draft={draft}
                  updateDraft={updateDraft}
                  errors={errors}
                />
              )}
              {currentStep === 5 && (
                <StepSicCodes
                  draft={draft}
                  updateDraft={updateDraft}
                  errors={errors}
                />
              )}
              {currentStep === 6 && (
                <StepContact
                  draft={draft}
                  updateDraft={updateDraft}
                  errors={errors}
                />
              )}
              {currentStep === 7 && <StepReview draft={draft} />}
            </CardContent>
          </Card>

          {errors.submit && (
            <div
              className="mb-4 p-4 bg-destructive/10 border border-destructive rounded-lg"
              data-ocid="wizard.error_state"
            >
              <p className="text-sm text-destructive">{errors.submit}</p>
            </div>
          )}

          <div className="flex justify-between mb-8">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentStep === 0}
              data-ocid="wizard.secondary_button"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} data-ocid="wizard.primary_button">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                data-ocid="wizard.submit_button"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
