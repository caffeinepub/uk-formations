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
import { Plus, Trash2 } from "lucide-react";
import type { FormationDraft, Shareholder } from "../formationDraft";
import type { ValidationErrors } from "../validation";

interface StepShareholdersProps {
  draft: FormationDraft;
  updateDraft: (updates: Partial<FormationDraft>) => void;
  errors: ValidationErrors;
}

export default function StepShareholders({
  draft,
  updateDraft,
  errors,
}: StepShareholdersProps) {
  const addShareholder = () => {
    const newShareholder: Shareholder = {
      id: Date.now().toString(),
      name: "",
      shares: 0,
      shareClass: "Ordinary",
    };
    updateDraft({ shareholders: [...draft.shareholders, newShareholder] });
  };

  const removeShareholder = (id: string) => {
    updateDraft({
      shareholders: draft.shareholders.filter((s) => s.id !== id),
    });
  };

  const updateShareholder = (id: string, updates: Partial<Shareholder>) => {
    updateDraft({
      shareholders: draft.shareholders.map((s) =>
        s.id === id ? { ...s, ...updates } : s,
      ),
    });
  };

  const totalAllocated = draft.shareholders.reduce(
    (sum, s) => sum + (s.shares || 0),
    0,
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Share Capital</CardTitle>
          <CardDescription>
            Define your company's share structure. Most companies start with 100
            shares at £1 each.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalShares">Total Number of Shares</Label>
              <Input
                id="totalShares"
                type="number"
                value={draft.totalShares}
                onChange={(e) =>
                  updateDraft({
                    totalShares: Number.parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shareCapital">Share Capital (£)</Label>
              <Input
                id="shareCapital"
                type="number"
                value={draft.shareCapital}
                onChange={(e) =>
                  updateDraft({
                    shareCapital: Number.parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shareholders</CardTitle>
          <CardDescription>
            Add shareholders and allocate shares. Shareholders can be
            individuals or companies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errors.shareholders && (
            <p className="text-sm text-destructive mb-4">
              {errors.shareholders}
            </p>
          )}
          {errors.totalShares && (
            <p className="text-sm text-destructive mb-4">
              {errors.totalShares}
            </p>
          )}
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="font-semibold">Allocated:</span> {totalAllocated}{" "}
              of {draft.totalShares} shares
            </p>
          </div>
          <Button onClick={addShareholder} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Shareholder
          </Button>
        </CardContent>
      </Card>

      {draft.shareholders.map((shareholder, index) => (
        <Card key={shareholder.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Shareholder {index + 1}</CardTitle>
              <Button
                onClick={() => removeShareholder(shareholder.id)}
                variant="ghost"
                size="sm"
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`shareholder${index}Name`}>Name *</Label>
              <Input
                id={`shareholder${index}Name`}
                value={shareholder.name}
                onChange={(e) =>
                  updateShareholder(shareholder.id, { name: e.target.value })
                }
                placeholder="Full name or company name"
              />
              {errors[`shareholder${index}Name`] && (
                <p className="text-sm text-destructive">
                  {errors[`shareholder${index}Name`]}
                </p>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`shareholder${index}Shares`}>
                  Number of Shares *
                </Label>
                <Input
                  id={`shareholder${index}Shares`}
                  type="number"
                  value={shareholder.shares || ""}
                  onChange={(e) =>
                    updateShareholder(shareholder.id, {
                      shares: Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
                {errors[`shareholder${index}Shares`] && (
                  <p className="text-sm text-destructive">
                    {errors[`shareholder${index}Shares`]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`shareholder${index}ShareClass`}>
                  Share Class
                </Label>
                <Input
                  id={`shareholder${index}ShareClass`}
                  value={shareholder.shareClass}
                  onChange={(e) =>
                    updateShareholder(shareholder.id, {
                      shareClass: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
