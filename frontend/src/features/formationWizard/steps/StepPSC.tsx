import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormationDraft, PSC } from '../formationDraft';
import { ValidationErrors } from '../validation';
import { Plus, Trash2 } from 'lucide-react';

interface StepPSCProps {
  draft: FormationDraft;
  updateDraft: (updates: Partial<FormationDraft>) => void;
  errors: ValidationErrors;
}

const controlOptions = [
  { id: 'shares', label: 'Holds more than 25% of shares' },
  { id: 'voting', label: 'Holds more than 25% of voting rights' },
  { id: 'appoint', label: 'Right to appoint or remove directors' },
  { id: 'influence', label: 'Significant influence or control' },
];

export default function StepPSC({ draft, updateDraft, errors }: StepPSCProps) {
  const addPSC = () => {
    const newPSC: PSC = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
      address: '',
      postcode: '',
      natureOfControl: [],
    };
    updateDraft({ pscs: [...draft.pscs, newPSC] });
  };

  const removePSC = (id: string) => {
    updateDraft({ pscs: draft.pscs.filter((p) => p.id !== id) });
  };

  const updatePSC = (id: string, updates: Partial<PSC>) => {
    updateDraft({
      pscs: draft.pscs.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const toggleControl = (pscId: string, controlId: string) => {
    const psc = draft.pscs.find((p) => p.id === pscId);
    if (!psc) return;

    const newControls = psc.natureOfControl.includes(controlId)
      ? psc.natureOfControl.filter((c) => c !== controlId)
      : [...psc.natureOfControl, controlId];

    updatePSC(pscId, { natureOfControl: newControls });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Persons with Significant Control (PSC)</CardTitle>
          <CardDescription>
            A PSC is anyone who owns more than 25% of shares or voting rights, or has significant influence
            over the company. All companies must have at least one PSC.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errors.pscs && <p className="text-sm text-destructive mb-4">{errors.pscs}</p>}
          <Button onClick={addPSC} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add PSC
          </Button>
        </CardContent>
      </Card>

      {draft.pscs.map((psc, index) => (
        <Card key={psc.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">PSC {index + 1}</CardTitle>
              <Button
                onClick={() => removePSC(psc.id)}
                variant="ghost"
                size="sm"
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`psc${index}FirstName`}>First Name *</Label>
                <Input
                  id={`psc${index}FirstName`}
                  value={psc.firstName}
                  onChange={(e) => updatePSC(psc.id, { firstName: e.target.value })}
                />
                {errors[`psc${index}FirstName`] && (
                  <p className="text-sm text-destructive">{errors[`psc${index}FirstName`]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`psc${index}LastName`}>Last Name *</Label>
                <Input
                  id={`psc${index}LastName`}
                  value={psc.lastName}
                  onChange={(e) => updatePSC(psc.id, { lastName: e.target.value })}
                />
                {errors[`psc${index}LastName`] && (
                  <p className="text-sm text-destructive">{errors[`psc${index}LastName`]}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`psc${index}DateOfBirth`}>Date of Birth *</Label>
                <Input
                  id={`psc${index}DateOfBirth`}
                  type="date"
                  value={psc.dateOfBirth}
                  onChange={(e) => updatePSC(psc.id, { dateOfBirth: e.target.value })}
                />
                {errors[`psc${index}DateOfBirth`] && (
                  <p className="text-sm text-destructive">{errors[`psc${index}DateOfBirth`]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`psc${index}Nationality`}>Nationality *</Label>
                <Input
                  id={`psc${index}Nationality`}
                  value={psc.nationality}
                  onChange={(e) => updatePSC(psc.id, { nationality: e.target.value })}
                  placeholder="e.g., British"
                />
                {errors[`psc${index}Nationality`] && (
                  <p className="text-sm text-destructive">{errors[`psc${index}Nationality`]}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`psc${index}Address`}>Address *</Label>
              <Input
                id={`psc${index}Address`}
                value={psc.address}
                onChange={(e) => updatePSC(psc.id, { address: e.target.value })}
                placeholder="Full address"
              />
              {errors[`psc${index}Address`] && (
                <p className="text-sm text-destructive">{errors[`psc${index}Address`]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`psc${index}Postcode`}>Postcode</Label>
              <Input
                id={`psc${index}Postcode`}
                value={psc.postcode}
                onChange={(e) => updatePSC(psc.id, { postcode: e.target.value })}
                placeholder="e.g., SW1A 1AA"
              />
            </div>
            <div className="space-y-3">
              <Label>Nature of Control *</Label>
              {controlOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`psc${index}${option.id}`}
                    checked={psc.natureOfControl.includes(option.id)}
                    onCheckedChange={() => toggleControl(psc.id, option.id)}
                  />
                  <Label htmlFor={`psc${index}${option.id}`} className="font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
              {errors[`psc${index}NatureOfControl`] && (
                <p className="text-sm text-destructive">{errors[`psc${index}NatureOfControl`]}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

