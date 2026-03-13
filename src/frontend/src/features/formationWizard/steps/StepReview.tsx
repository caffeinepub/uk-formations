import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import type { FormationDraft } from "../formationDraft";

interface StepReviewProps {
  draft: FormationDraft;
}

export default function StepReview({ draft }: StepReviewProps) {
  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Review Your Application</CardTitle>
          </div>
          <CardDescription>
            Please review all information carefully before submitting. You can
            go back to edit any section.
          </CardDescription>
        </CardHeader>
      </Card>

      {draft.selectedPackage && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">
                  {draft.selectedPackage.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Company formation package
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  £{draft.selectedPackage.price}
                </p>
                <p className="text-sm text-muted-foreground">+ VAT</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">
              Company Name Preferences
            </p>
            <ol className="list-decimal list-inside space-y-1">
              {draft.companyNamePreferences
                .filter((name) => name.trim())
                .map((name) => (
                  <li key={name} className="text-sm">
                    {name}
                  </li>
                ))}
            </ol>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">
              Company Type
            </p>
            <p className="text-sm capitalize">
              {draft.companyType.replace(/-/g, " ")}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registered Office</CardTitle>
        </CardHeader>
        <CardContent>
          {draft.registeredOfficeOption === "own" ? (
            <div>
              <p className="text-sm">{draft.registeredOfficeAddress}</p>
              <p className="text-sm">{draft.registeredOfficePostcode}</p>
            </div>
          ) : (
            <p className="text-sm">Using registered office service</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Directors ({draft.directors.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {draft.directors.map((director, index) => (
            <div key={director.id}>
              {index > 0 && <Separator className="my-4" />}
              <div className="space-y-2">
                <p className="font-semibold">
                  {director.firstName} {director.lastName}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">DOB:</span>{" "}
                    {director.dateOfBirth}
                  </div>
                  <div>
                    <span className="font-medium">Nationality:</span>{" "}
                    {director.nationality}
                  </div>
                  {director.occupation && (
                    <div className="col-span-2">
                      <span className="font-medium">Occupation:</span>{" "}
                      {director.occupation}
                    </div>
                  )}
                  <div className="col-span-2">
                    <span className="font-medium">Address:</span>{" "}
                    {director.address}
                    {director.postcode && `, ${director.postcode}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Share Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-muted-foreground">
                Total Shares
              </p>
              <p className="text-lg font-semibold">{draft.totalShares}</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">
                Share Capital
              </p>
              <p className="text-lg font-semibold">£{draft.shareCapital}</p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="font-semibold mb-3">
              Shareholders ({draft.shareholders.length})
            </p>
            <div className="space-y-2">
              {draft.shareholders.map((shareholder) => (
                <div
                  key={shareholder.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{shareholder.name}</span>
                  <Badge variant="secondary">
                    {shareholder.shares} {shareholder.shareClass} shares
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Persons with Significant Control ({draft.pscs.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {draft.pscs.map((psc, index) => (
            <div key={psc.id}>
              {index > 0 && <Separator className="my-4" />}
              <div className="space-y-2">
                <p className="font-semibold">
                  {psc.firstName} {psc.lastName}
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium">DOB:</span> {psc.dateOfBirth}
                  </p>
                  <p>
                    <span className="font-medium">Nationality:</span>{" "}
                    {psc.nationality}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> {psc.address}
                    {psc.postcode && `, ${psc.postcode}`}
                  </p>
                  <div>
                    <span className="font-medium">Nature of Control:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {psc.natureOfControl.map((control) => (
                        <Badge
                          key={control}
                          variant="outline"
                          className="text-xs"
                        >
                          {control}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-semibold text-muted-foreground mb-2">
            SIC Codes
          </p>
          <div className="flex flex-wrap gap-2">
            {draft.sicCodes.map((code) => (
              <Badge key={code} variant="secondary">
                {code}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {draft.contactName && (
            <p>
              <span className="font-semibold">Name:</span> {draft.contactName}
            </p>
          )}
          <p>
            <span className="font-semibold">Email:</span> {draft.contactEmail}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {draft.contactPhone}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
