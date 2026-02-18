import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Section from '@/components/Section';
import { useGetAllOrders } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Loader2, Eye } from 'lucide-react';

export default function AdminOrdersPage() {
  const { identity } = useInternetIdentity();
  const { data: orders, isLoading, error } = useGetAllOrders();
  const navigate = useNavigate();

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
              You do not have permission to access this page. Only administrators can view orders.
            </CardDescription>
          </CardHeader>
        </Card>
      </Section>
    );
  }

  return (
    <div>
      <Section className="bg-gradient-to-b from-muted/50 to-background">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Order Management</h1>
          <p className="text-muted-foreground">View and manage all company formation orders</p>
        </div>
      </Section>

      <Section>
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>
              {orders ? `${orders.length} total orders` : 'Loading orders...'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Formation Type</TableHead>
                      <TableHead>Contact Email</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id.toString()}>
                        <TableCell className="font-medium">#{order.id.toString()}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.businessName}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {order.formationType.replace(/-/g, ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {order.contactEmail}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate({ to: '/admin/orders/$orderId', params: { orderId: order.id.toString() } })}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No orders found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}

