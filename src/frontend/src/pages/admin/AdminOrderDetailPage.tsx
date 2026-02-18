import { useParams, Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Section from '@/components/Section';
import { useGetOrderById } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function AdminOrderDetailPage() {
  const { orderId } = useParams({ from: '/admin/orders/$orderId' });
  const { identity } = useInternetIdentity();
  const orderIdBigInt = orderId ? BigInt(orderId) : null;
  const { data: order, isLoading, error } = useGetOrderById(orderIdBigInt);

  if (!identity) {
    return (
      <Section>
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please log in to access the admin area.</CardDescription>
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
              You do not have permission to access this page. Only administrators can view order details.
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
            <CardDescription>The requested order could not be found.</CardDescription>
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

  let additionalDetails: any = {};
  try {
    additionalDetails = JSON.parse(order.additionalDetails);
  } catch (e) {
    console.error('Failed to parse additional details:', e);
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
          <h1 className="text-4xl font-bold mb-2">Order #{order.id.toString()}</h1>
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
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Customer Name</p>
                  <p>{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Contact Email</p>
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
                <p className="text-sm font-semibold text-muted-foreground mb-1">Business Name</p>
                <p className="text-lg font-semibold">{order.businessName}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Formation Type</p>
                <Badge variant="secondary" className="capitalize">
                  {order.formationType.replace(/-/g, ' ')}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {additionalDetails.package && (
            <Card>
              <CardHeader>
                <CardTitle>Package Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">{additionalDetails.package.name}</p>
                    <p className="text-sm text-muted-foreground">Formation package</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">£{additionalDetails.package.price}</p>
                    <p className="text-sm text-muted-foreground">+ VAT</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {additionalDetails.companyNamePreferences && (
            <Card>
              <CardHeader>
                <CardTitle>Company Name Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-1">
                  {additionalDetails.companyNamePreferences
                    .filter((name: string) => name.trim())
                    .map((name: string, index: number) => (
                      <li key={index}>{name}</li>
                    ))}
                </ol>
              </CardContent>
            </Card>
          )}

          {additionalDetails.directors && additionalDetails.directors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Directors ({additionalDetails.directors.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {additionalDetails.directors.map((director: any, index: number) => (
                  <div key={director.id}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="space-y-2">
                      <p className="font-semibold">
                        {director.firstName} {director.lastName}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">DOB:</span> {director.dateOfBirth}
                        </div>
                        <div>
                          <span className="font-medium">Nationality:</span> {director.nationality}
                        </div>
                        {director.occupation && (
                          <div className="col-span-2">
                            <span className="font-medium">Occupation:</span> {director.occupation}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {additionalDetails.shareholders && additionalDetails.shareholders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Shareholders ({additionalDetails.shareholders.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {additionalDetails.shareholders.map((shareholder: any) => (
                  <div key={shareholder.id} className="flex justify-between items-center">
                    <span>{shareholder.name}</span>
                    <Badge variant="secondary">
                      {shareholder.shares} {shareholder.shareClass} shares
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {additionalDetails.sicCodes && additionalDetails.sicCodes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>SIC Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {additionalDetails.sicCodes.map((code: string) => (
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

