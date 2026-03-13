import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormationDraft } from "../formationDraft";
import type { ValidationErrors } from "../validation";

interface StepContactProps {
  draft: FormationDraft;
  updateDraft: (updates: Partial<FormationDraft>) => void;
  errors: ValidationErrors;
}

export default function StepContact({
  draft,
  updateDraft,
  errors,
}: StepContactProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Provide your contact details so we can reach you about your
            application and send your company documents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactName">Full Name</Label>
            <Input
              id="contactName"
              value={draft.contactName}
              onChange={(e) => updateDraft({ contactName: e.target.value })}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Email Address *</Label>
            <Input
              id="contactEmail"
              type="email"
              value={draft.contactEmail}
              onChange={(e) => updateDraft({ contactEmail: e.target.value })}
              placeholder="your.email@example.com"
            />
            {errors.contactEmail && (
              <p className="text-sm text-destructive">{errors.contactEmail}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Phone Number *</Label>
            <Input
              id="contactPhone"
              type="tel"
              value={draft.contactPhone}
              onChange={(e) => updateDraft({ contactPhone: e.target.value })}
              placeholder="+44 20 1234 5678"
            />
            {errors.contactPhone && (
              <p className="text-sm text-destructive">{errors.contactPhone}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            We will use this information to contact you about your application
            and to send your Certificate of Incorporation and other company
            documents. Your contact details will not be shared publicly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
