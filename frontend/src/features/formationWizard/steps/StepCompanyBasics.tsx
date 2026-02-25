import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormationDraft } from '../formationDraft';
import { ValidationErrors } from '../validation';

interface StepCompanyBasicsProps {
  draft: FormationDraft;
  updateDraft: (updates: Partial<FormationDraft>) => void;
  errors: ValidationErrors;
}

export default function StepCompanyBasics({ draft, updateDraft, errors }: StepCompanyBasicsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Name Preferences</CardTitle>
          <CardDescription>
            Provide up to three company name preferences. We will check availability and register your first
            available choice.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`name${index + 1}`}>
                {index === 0 ? 'First Choice *' : `${index === 1 ? 'Second' : 'Third'} Choice (Optional)`}
              </Label>
              <Input
                id={`name${index + 1}`}
                value={draft.companyNamePreferences[index] || ''}
                onChange={(e) => {
                  const newPreferences = [...draft.companyNamePreferences];
                  newPreferences[index] = e.target.value;
                  updateDraft({ companyNamePreferences: newPreferences });
                }}
                placeholder="Enter company name"
              />
              {index === 0 && errors.companyName1 && (
                <p className="text-sm text-destructive">{errors.companyName1}</p>
              )}
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Note: "Limited" or "Ltd" will be automatically added to your company name.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Type</CardTitle>
          <CardDescription>Select the type of company you want to form.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyType">Company Type *</Label>
            <Select value={draft.companyType} onValueChange={(value) => updateDraft({ companyType: value })}>
              <SelectTrigger id="companyType">
                <SelectValue placeholder="Select company type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private-limited-shares">Private Limited by Shares</SelectItem>
                <SelectItem value="private-limited-guarantee">Private Limited by Guarantee</SelectItem>
                <SelectItem value="public-limited">Public Limited Company</SelectItem>
              </SelectContent>
            </Select>
            {errors.companyType && <p className="text-sm text-destructive">{errors.companyType}</p>}
          </div>
          <p className="text-sm text-muted-foreground">
            Most small businesses choose "Private Limited by Shares" (Ltd).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

