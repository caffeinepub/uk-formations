import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { useGetOrderById } from "../../hooks/useQueries";

export default function AdminOrderDetailPage() {
  const { orderId } = useParams({ from: "/admin/orders/$orderId" });
  const { identity } = useInternetIdentity();
  const orderIdBigInt = orderId ? BigInt(orderId) : null;
  const { data: order, isLoading, error } = useGetOrderById(orderIdBigInt);

  if (!identity) {
    return (
      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              Please log in to access the admin area.
            </CardDescription>
          </CardHeader>
        </Card>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to access this page. Only
              administrators can view order details.
            </CardDescription>
          </CardHeader>
        </Card>
      </Section>
    );
  }

  if (isLoading) {
    return (
      <Section>
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Section>
    );
  }

  if (!order) {
    return (
      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Order Not Found</CardTitle>
            <CardDescription>
              The requested order could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/admin/orders">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Section>
    );
  }

  // Parse extended data stored in contactDetails JSON
  let extraDetails: any = {};
  try {
    if (order.contactDetails) {
      extraDetails = JSON.parse(order.contactDetails);
    }
  } catch (e) {
    console.error("Failed to parse contact details:", e);
  }

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/admin/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">
            Order #{order.id.toString()}
          </h1>
          <p className="text-muted-foreground">View complete order details</p>
        </div>
      </Section>

      <Section>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Customer Name
                  </p>
                  <p>{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Contact Email
                  </p>
                  <p>{order.contactEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">
                  Company Name
                </p>
                <p className="text-lg font-semibold">{order.companyName}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">
                  Package Selected
                </p>
                <Badge variant="secondary" className="capitalize">
                  {order.packageSelected}
                </Badge>
              </div>
              {order.registeredOfficeAddress && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      Registered Office
                    </p>
                    <p>{order.registeredOfficeAddress}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {extraDetails.package && (
            <Card>
              <CardHeader>
                <CardTitle>Package Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">
                      {extraDetails.package.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Formation package
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      £{extraDetails.package.price}
                    </p>
                    <p className="text-sm text-muted-foreground">+ VAT</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {extraDetails.companyNamePreferences && (
            <Card>
              <CardHeader>
                <CardTitle>Company Name Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-1">
                  {extraDetails.companyNamePreferences
                    .filter((name: string) => name.trim())
                    .map((name: string) => (
                      <li key={name}>{name}</li>
                    ))}
                </ol>
              </CardContent>
            </Card>
          )}

          {order.directorDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Directors</CardTitle>
              </CardHeader>
              <CardContent>
                <DirectorsList raw={order.directorDetails} />
              </CardContent>
            </Card>
          )}

          {order.shareholderDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Shareholders</CardTitle>
              </CardHeader>
              <CardContent>
                <ShareholdersList raw={order.shareholderDetails} />
              </CardContent>
            </Card>
          )}

          {order.sicCodes && order.sicCodes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>SIC Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {order.sicCodes.map((code: string) => (
                    <Badge key={code} variant="secondary">
                      {code}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </div>
  );
}

function DirectorsList({ raw }: { raw: string }) {
  let directors: any[] = [];
  try {
    directors = JSON.parse(raw);
  } catch {
    return (
      <p className="text-sm text-muted-foreground">
        No director data available.
      </p>
    );
  }
  if (!Array.isArray(directors) || directors.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No directors listed.</p>
    );
  }
  return (
    <div className="space-y-4">
      {directors.map((director: any, index: number) => (
        <div key={director.id ?? index}>
          {index > 0 && <Separator className="my-4" />}
          <div className="space-y-2">
            <p className="font-semibold">
              {director.firstName} {director.lastName}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {director.dateOfBirth && (
                <div>
                  <span className="font-medium">DOB:</span>{" "}
                  {director.dateOfBirth}
                </div>
              )}
              {director.nationality && (
                <div>
                  <span className="font-medium">Nationality:</span>{" "}
                  {director.nationality}
                </div>
              )}
              {director.occupation && (
                <div className="col-span-2">
                  <span className="font-medium">Occupation:</span>{" "}
                  {director.occupation}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ShareholdersList({ raw }: { raw: string }) {
  let shareholders: any[] = [];
  try {
    shareholders = JSON.parse(raw);
  } catch {
    return (
      <p className="text-sm text-muted-foreground">
        No shareholder data available.
      </p>
    );
  }
  if (!Array.isArray(shareholders) || shareholders.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No shareholders listed.</p>
    );
  }
  return (
    <div className="space-y-2">
      {shareholders.map((shareholder: any, index: number) => (
        <div
          key={shareholder.id ?? index}
          className="flex justify-between items-center"
        >
          <span>{shareholder.name}</span>
          <Badge variant="secondary">
            {shareholder.shares} {shareholder.shareClass} shares
          </Badge>
        </div>
      ))}
    </div>
  );
}
