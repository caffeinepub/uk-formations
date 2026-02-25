import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Download, Code, FileCode, Folder, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function AdminExportPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const [copied, setCopied] = useState(false);

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You must be logged in to access this page. Please log in and try again.
          </AlertDescription>
        </Alert>
        <div className="mt-6">
          <Button onClick={() => navigate({ to: '/' })}>Go to Home</Button>
        </div>
      </div>
    );
  }

  if (isAdminLoading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Verifying permissions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You do not have permission to access this page. Only administrators can export project code.
          </AlertDescription>
        </Alert>
        <div className="mt-6">
          <Button onClick={() => navigate({ to: '/' })}>Go to Home</Button>
        </div>
      </div>
    );
  }

  const projectStructure = `uk-formations/
├── backend/
│   └── main.mo
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   └── SiteLayout.tsx
│   │   │   └── ui/
│   │   ├── hooks/
│   │   │   ├── useActor.ts
│   │   │   ├── useInternetIdentity.ts
│   │   │   └── useQueries.ts
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminOrdersPage.tsx
│   │   │   │   ├── AdminOrderDetailPage.tsx
│   │   │   │   └── AdminExportPage.tsx
│   │   │   ├── legal/
│   │   │   │   ├── PrivacyPolicyPage.tsx
│   │   │   │   └── TermsOfServicePage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── PricingPage.tsx
│   │   │   ├── HowItWorksPage.tsx
│   │   │   ├── FaqPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── FormationWizardPage.tsx
│   │   │   └── OrderConfirmationPage.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   └── backend.d.ts
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
└── dfx.json`;

  const handleCopyStructure = () => {
    navigator.clipboard.writeText(projectStructure);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Export Project Code</h1>
          <p className="text-muted-foreground">
            Access and download information about your UK Formations project
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>About Code Export</AlertTitle>
          <AlertDescription>
            Your application is deployed on the Internet Computer blockchain. The code is permanently stored and
            accessible through the canister. Below you'll find information about your project structure and how to
            access the source code.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Project Structure
            </CardTitle>
            <CardDescription>
              Overview of your application's file organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{projectStructure}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={handleCopyStructure}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Code className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Frontend Code
              </CardTitle>
              <CardDescription>React + TypeScript application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Included Files:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• All React components and pages</li>
                  <li>• Custom hooks and utilities</li>
                  <li>• Tailwind CSS configuration</li>
                  <li>• TypeScript type definitions</li>
                  <li>• UI components (shadcn/ui)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Key Technologies:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• React 19</li>
                  <li>• TypeScript</li>
                  <li>• TanStack Router & Query</li>
                  <li>• Tailwind CSS</li>
                  <li>• Radix UI primitives</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Backend Code
              </CardTitle>
              <CardDescription>Motoko smart contract</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Included Files:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Main canister logic (main.mo)</li>
                  <li>• Authorization module</li>
                  <li>• Access control system</li>
                  <li>• Data structures and types</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• User profile management</li>
                  <li>• Formation order processing</li>
                  <li>• Role-based access control</li>
                  <li>• Admin functionality</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Accessing Your Code
            </CardTitle>
            <CardDescription>
              How to retrieve and work with your deployed application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Your Application is Live:</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Your code is deployed and running on the Internet Computer. The application is accessible at your
                current URL and will remain online permanently.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Code Preservation:</h4>
              <p className="text-sm text-muted-foreground mb-3">
                All source code is stored in the deployment system. Your frontend and backend code, along with all
                configuration files, are preserved and can be accessed through the Caffeine.ai platform.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">What's NOT Included:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• node_modules (install via npm/pnpm)</li>
                <li>• Build artifacts (regenerate with build commands)</li>
                <li>• Environment-specific files</li>
                <li>• Generated canister IDs</li>
              </ul>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Need Local Development?</AlertTitle>
              <AlertDescription>
                To set up a local development environment, you'll need to install the DFINITY SDK (dfx), Node.js, and
                run the setup commands specified in package.json. Your canister will need to be redeployed locally for
                development.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate({ to: '/admin/orders' })} variant="outline">
            Back to Orders
          </Button>
          <Button onClick={() => navigate({ to: '/' })} variant="outline">
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
