import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Section from '@/components/Section';
import { useCheckNameAvailability } from '@/hooks/useQueries';

export default function NameCheckPage() {
  const [inputValue, setInputValue] = useState('');
  const [searchName, setSearchName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { data: result, isLoading, isError } = useCheckNameAvailability(searchName, hasSearched);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setSearchName(trimmed);
    setHasSearched(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Reset result when user types a new name
    if (hasSearched && e.target.value.trim() !== searchName) {
      setHasSearched(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-muted/50 to-background pt-16 md:pt-24 pb-12">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Check Company Name Availability
          </h1>
          <p className="text-lg text-muted-foreground">
            Find out if your desired company name is available before starting your formation. Enter your
            proposed company name below to check its availability instantly.
          </p>
        </div>
      </Section>

      {/* Search Section */}
      <Section className="pb-16">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-base font-semibold">
                Company Name
              </Label>
              <div className="flex gap-3">
                <Input
                  id="company-name"
                  type="text"
                  placeholder="e.g. Acme Trading Limited"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="flex-1 h-12 text-base"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading || !inputValue.trim()}
                  className="shrink-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Checking…
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
                Enter the full proposed company name including any suffix (e.g. Limited, Ltd, LLP).
              </p>
            </div>
          </form>

          {/* Result Area */}
          {hasSearched && !isLoading && (
            <div className="mt-8">
              {isError ? (
                <div className="flex items-start gap-4 p-5 rounded-lg border-2 border-destructive/40 bg-destructive/5">
                  <XCircle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-destructive">Check Failed</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We were unable to complete the name check. Please try again.
                    </p>
                  </div>
                </div>
              ) : result ? (
                result.isAvailable ? (
                  <div className="flex items-start gap-4 p-5 rounded-lg border-2 border-green-500/40 bg-green-50 dark:bg-green-950/20">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-700 dark:text-green-400">Name Available</p>
                      <p className="text-sm text-green-700/80 dark:text-green-400/80 mt-1">
                        {result.message}
                      </p>
                      <p className="text-sm text-muted-foreground mt-3">
                        Great news! You can proceed with this name for your company formation.
                      </p>
                      <Button asChild size="sm" className="mt-4">
                        <a href="/formation-wizard">Start Formation</a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4 p-5 rounded-lg border-2 border-amber-500/40 bg-amber-50 dark:bg-amber-950/20">
                    <XCircle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-700 dark:text-amber-400">Name Unavailable</p>
                      <p className="text-sm text-amber-700/80 dark:text-amber-400/80 mt-1">
                        {result.message}
                      </p>
                      <p className="text-sm text-muted-foreground mt-3">
                        Please try a different name. You may want to add a unique word, location, or descriptor to make it distinct.
                      </p>
                    </div>
                  </div>
                )
              ) : null}
            </div>
          )}
        </div>
      </Section>

      {/* Info Section */}
      <Section className="bg-muted/30 pb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Tips for Choosing a Company Name</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Be Unique',
                desc: 'Choose a name that stands out and is not too similar to existing companies.',
              },
              {
                title: 'Include a Suffix',
                desc: 'UK limited companies must end with "Limited" or "Ltd" (or Welsh equivalents).',
              },
              {
                title: 'Avoid Sensitive Words',
                desc: 'Certain words like "Royal", "Bank", or "Insurance" require special permission.',
              },
              {
                title: 'Keep It Professional',
                desc: 'Your company name will appear on all official documents and correspondence.',
              },
            ].map((tip) => (
              <div key={tip.title} className="flex gap-3 p-4 rounded-lg bg-background border">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">{tip.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
