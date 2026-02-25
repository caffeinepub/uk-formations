import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Section from '@/components/Section';
import { useFormationDraft } from '../features/formationWizard/useFormationDraft';
import {
  validateCompanyBasics,
  validateRegisteredOffice,
  validateDirectors,
  validateShareholders,
  validatePSC,
  validateSicCodes,
  validateContact,
  ValidationErrors,
} from '../features/formationWizard/validation';
import StepCompanyBasics from '../features/formationWizard/steps/StepCompanyBasics';
import StepRegisteredOffice from '../features/formationWizard/steps/StepRegisteredOffice';
import StepDirectors from '../features/formationWizard/steps/StepDirectors';
import StepShareholders from '../features/formationWizard/steps/StepShareholders';
import StepPSC from '../features/formationWizard/steps/StepPSC';
import StepSicCodes from '../features/formationWizard/steps/StepSicCodes';
import StepContact from '../features/formationWizard/steps/StepContact';
import StepReview from '../features/formationWizard/steps/StepReview';
import { useSubmitFormationOrder } from '../hooks/useQueries';
import { convertDraftToOrderInput, saveConfirmation } from '../features/formationWizard/submitOrder';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const steps = [
  { id: 'basics', title: 'Company Basics', description: 'Name and type' },
  { id: 'office', title: 'Registered Office', description: 'Official address' },
  { id: 'directors', title: 'Directors', description: 'Company directors' },
  { id: 'shareholders', title: 'Shareholders', description: 'Share allocation' },
  { id: 'psc', title: 'PSC', description: 'Significant control' },
  { id: 'sic', title: 'SIC Codes', description: 'Business activities' },
  { id: 'contact', title: 'Contact', description: 'Your details' },
  { id: 'review', title: 'Review', description: 'Final check' },
];

export default function FormationWizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { draft, updateDraft, clearDraft } = useFormationDraft();
  const navigate = useNavigate();
  const submitMutation = useSubmitFormationOrder();

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    try {
      const orderInput = convertDraftToOrderInput(draft);
      const response = await submitMutation.mutateAsync(orderInput);

      saveConfirmation({
        orderId: Number(response.orderId),
        companyName: draft.companyNamePreferences[0] || 'Not provided',
        packageName: draft.selectedPackage?.name || 'Not selected',
        packagePrice: draft.selectedPackage?.price || 0,
        timestamp: new Date().toISOString(),
      });

      clearDraft();
      navigate({ to: '/confirmation' });
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit order. Please try again.' });
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Company Formation Wizard</h1>
            <p className="text-muted-foreground">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
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
                      ? 'text-primary font-semibold'
                      : index < currentStep
                      ? 'text-muted-foreground'
                      : 'text-muted-foreground/50'
                  }`}
                >
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm mb-1 ${
                      index === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : index < currentStep
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted'
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
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 0 && (
                <StepCompanyBasics draft={draft} updateDraft={updateDraft} errors={errors} />
              )}
              {currentStep === 1 && (
                <StepRegisteredOffice draft={draft} updateDraft={updateDraft} errors={errors} />
              )}
              {currentStep === 2 && <StepDirectors draft={draft} updateDraft={updateDraft} errors={errors} />}
              {currentStep === 3 && (
                <StepShareholders draft={draft} updateDraft={updateDraft} errors={errors} />
              )}
              {currentStep === 4 && <StepPSC draft={draft} updateDraft={updateDraft} errors={errors} />}
              {currentStep === 5 && <StepSicCodes draft={draft} updateDraft={updateDraft} errors={errors} />}
              {currentStep === 6 && <StepContact draft={draft} updateDraft={updateDraft} errors={errors} />}
              {currentStep === 7 && <StepReview draft={draft} />}
            </CardContent>
          </Card>

          {errors.submit && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
              <p className="text-sm text-destructive">{errors.submit}</p>
            </div>
          )}

          <div className="flex justify-between mb-8">
            <Button onClick={handleBack} variant="outline" disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitMutation.isPending}>
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}

