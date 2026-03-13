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
import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { FormationDraft } from "../formationDraft";
import type { ValidationErrors } from "../validation";

interface StepSicCodesProps {
  draft: FormationDraft;
  updateDraft: (updates: Partial<FormationDraft>) => void;
  errors: ValidationErrors;
}

export default function StepSicCodes({
  draft,
  updateDraft,
  errors,
}: StepSicCodesProps) {
  const [newCode, setNewCode] = useState("");

  const addSicCode = () => {
    if (newCode.trim() && !draft.sicCodes.includes(newCode.trim())) {
      updateDraft({ sicCodes: [...draft.sicCodes, newCode.trim()] });
      setNewCode("");
    }
  };

  const removeSicCode = (code: string) => {
    updateDraft({ sicCodes: draft.sicCodes.filter((c) => c !== code) });
  };

  const commonCodes = [
    {
      code: "62012",
      description: "Business and domestic software development",
    },
    { code: "70221", description: "Financial management" },
    { code: "82990", description: "Other business support service activities" },
    { code: "73110", description: "Advertising agencies" },
    { code: "74100", description: "Specialised design activities" },
    {
      code: "47910",
      description: "Retail sale via mail order houses or via Internet",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Standard Industrial Classification (SIC) Codes</CardTitle>
          <CardDescription>
            SIC codes describe your business activities. You can add up to 4
            codes. Choose the codes that best describe what your company will
            do.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errors.sicCodes && (
            <p className="text-sm text-destructive">{errors.sicCodes}</p>
          )}

          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="sicCode">Add SIC Code</Label>
              <Input
                id="sicCode"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="e.g., 62012"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSicCode();
                  }
                }}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={addSicCode}
                disabled={!newCode.trim() || draft.sicCodes.length >= 4}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {draft.sicCodes.length > 0 && (
            <div className="space-y-2">
              <Label>Selected SIC Codes</Label>
              <div className="flex flex-wrap gap-2">
                {draft.sicCodes.map((code) => (
                  <Badge key={code} variant="secondary" className="text-sm">
                    {code}
                    <button
                      type="button"
                      onClick={() => removeSicCode(code)}
                      className="ml-2 hover:text-destructive"
                      aria-label="Remove"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common SIC Codes</CardTitle>
          <CardDescription>
            Click to add a common SIC code to your selection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {commonCodes.map((item) => (
              <button
                type="button"
                key={item.code}
                onClick={() => {
                  if (
                    !draft.sicCodes.includes(item.code) &&
                    draft.sicCodes.length < 4
                  ) {
                    updateDraft({ sicCodes: [...draft.sicCodes, item.code] });
                  }
                }}
                disabled={
                  draft.sicCodes.includes(item.code) ||
                  draft.sicCodes.length >= 4
                }
                className="w-full text-left p-3 border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="font-semibold">{item.code}</div>
                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> You can find the full list of SIC codes on
            the Companies House website. If you're unsure which codes to use,
            you can search for codes that match your business activities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
