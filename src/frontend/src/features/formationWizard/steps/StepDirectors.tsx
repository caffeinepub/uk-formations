import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormationDraft, Director } from '../formationDraft';
import { ValidationErrors } from '../validation';
import { Plus, Trash2 } from 'lucide-react';

interface StepDirectorsProps {
  draft: FormationDraft;
  updateDraft: (updates: Partial<FormationDraft>) => void;
  errors: ValidationErrors;
}

export default function StepDirectors({ draft, updateDraft, errors }: StepDirectorsProps) {
  const addDirector = () => {
    const newDirector: Director = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
      occupation: '',
      address: '',
      postcode: '',
    };
    updateDraft({ directors: [...draft.directors, newDirector] });
  };

  const removeDirector = (id: string) => {
    updateDraft({ directors: draft.directors.filter((d) => d.id !== id) });
  };

  const updateDirector = (id: string, updates: Partial<Director>) => {
    updateDraft({
      directors: draft.directors.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Directors</CardTitle>
          <CardDescription>
            Add at least one director. Directors are responsible for running the company and must be at least
            16 years old.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errors.directors && <p className="text-sm text-destructive mb-4">{errors.directors}</p>}
          <Button onClick={addDirector} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Director
          </Button>
        </CardContent>
      </Card>

      {draft.directors.map((director, index) => (
        <Card key={director.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Director {index + 1}</CardTitle>
              <Button
                onClick={() => removeDirector(director.id)}
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
                <Label htmlFor={`director${index}FirstName`}>First Name *</Label>
                <Input
                  id={`director${index}FirstName`}
                  value={director.firstName}
                  onChange={(e) => updateDirector(director.id, { firstName: e.target.value })}
                />
                {errors[`director${index}FirstName`] && (
                  <p className="text-sm text-destructive">{errors[`director${index}FirstName`]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`director${index}LastName`}>Last Name *</Label>
                <Input
                  id={`director${index}LastName`}
                  value={director.lastName}
                  onChange={(e) => updateDirector(director.id, { lastName: e.target.value })}
                />
                {errors[`director${index}LastName`] && (
                  <p className="text-sm text-destructive">{errors[`director${index}LastName`]}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`director${index}DateOfBirth`}>Date of Birth *</Label>
                <Input
                  id={`director${index}DateOfBirth`}
                  type="date"
                  value={director.dateOfBirth}
                  onChange={(e) => updateDirector(director.id, { dateOfBirth: e.target.value })}
                />
                {errors[`director${index}DateOfBirth`] && (
                  <p className="text-sm text-destructive">{errors[`director${index}DateOfBirth`]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`director${index}Nationality`}>Nationality *</Label>
                <Input
                  id={`director${index}Nationality`}
                  value={director.nationality}
                  onChange={(e) => updateDirector(director.id, { nationality: e.target.value })}
                  placeholder="e.g., British"
                />
                {errors[`director${index}Nationality`] && (
                  <p className="text-sm text-destructive">{errors[`director${index}Nationality`]}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`director${index}Occupation`}>Occupation</Label>
              <Input
                id={`director${index}Occupation`}
                value={director.occupation}
                onChange={(e) => updateDirector(director.id, { occupation: e.target.value })}
                placeholder="e.g., Company Director"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`director${index}Address`}>Residential Address *</Label>
              <Input
                id={`director${index}Address`}
                value={director.address}
                onChange={(e) => updateDirector(director.id, { address: e.target.value })}
                placeholder="Full address"
              />
              {errors[`director${index}Address`] && (
                <p className="text-sm text-destructive">{errors[`director${index}Address`]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`director${index}Postcode`}>Postcode</Label>
              <Input
                id={`director${index}Postcode`}
                value={director.postcode}
                onChange={(e) => updateDirector(director.id, { postcode: e.target.value })}
                placeholder="e.g., SW1A 1AA"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

