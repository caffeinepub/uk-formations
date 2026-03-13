import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormationDraft } from "../formationDraft";
import type { ValidationErrors } from "../validation";

interface StepRegisteredOfficeProps {
  draft: FormationDraft;
  updateDraft: (updates: Partial<FormationDraft>) => void;
  errors: ValidationErrors;
}

export default function StepRegisteredOffice({
  draft,
  updateDraft,
  errors,
}: StepRegisteredOfficeProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Registered Office Address</CardTitle>
          <CardDescription>
            Your company's official address for legal correspondence. This will
            appear on the public Companies House register.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Address Option *</Label>
            <RadioGroup
              value={draft.registeredOfficeOption}
              onValueChange={(value: "own" | "service") =>
                updateDraft({ registeredOfficeOption: value })
              }
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="own" id="own" />
                <Label htmlFor="own" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Use my own address</div>
                  <div className="text-sm text-muted-foreground">
                    Use your home or business address
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="service" id="service" />
                <Label htmlFor="service" className="flex-1 cursor-pointer">
                  <div className="font-semibold">
                    Use registered office service
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Available with Standard and Premium packages
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {draft.registeredOfficeOption === "own" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  value={draft.registeredOfficeAddress}
                  onChange={(e) =>
                    updateDraft({ registeredOfficeAddress: e.target.value })
                  }
                  placeholder="Street address, city"
                />
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode *</Label>
                <Input
                  id="postcode"
                  value={draft.registeredOfficePostcode}
                  onChange={(e) =>
                    updateDraft({ registeredOfficePostcode: e.target.value })
                  }
                  placeholder="e.g., SW1A 1AA"
                />
                {errors.postcode && (
                  <p className="text-sm text-destructive">{errors.postcode}</p>
                )}
              </div>
            </div>
          )}

          {draft.registeredOfficeOption === "service" && (
            <div className="bg-muted/50 border rounded-lg p-4">
              <p className="text-sm">
                Our registered office service provides a professional UK
                business address for your company. This service is included with
                Standard and Premium packages.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
