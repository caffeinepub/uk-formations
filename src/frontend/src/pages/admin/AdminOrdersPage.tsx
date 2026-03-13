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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  Loader2,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { useGetAllOrders } from "../../hooks/useQueries";

function StripeSetupBanner() {
  const { actor } = useActor();
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [countries, setCountries] = useState("GB, US, CA, AU, IE");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!actor) return;
    actor
      .isStripeConfigured()
      .then((configured) => setIsConfigured(configured))
      .catch(() => setIsConfigured(null));
  }, [actor]);

  const handleSave = async () => {
    if (!actor || !secretKey.trim()) return;
    setIsSaving(true);
    try {
      await actor.setStripeConfiguration({
        secretKey: secretKey.trim(),
        allowedCountries: countries
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
      });
      setIsConfigured(true);
      setDialogOpen(false);
      setSecretKey("");
      toast.success("Stripe configured successfully!");
    } catch (err) {
      console.error("Stripe config error:", err);
      toast.error("Failed to save Stripe configuration. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isConfigured === null) return null;

  if (isConfigured) {
    return (
      <div
        className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-lg border border-green-500/30 bg-green-50 dark:bg-green-950/20 w-fit"
        data-ocid="stripe_setup.success_state"
      >
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <span className="text-sm font-medium text-green-700 dark:text-green-400">
          Stripe Configured
        </span>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-950/40"
              data-ocid="stripe_setup.open_modal_button"
            >
              <Settings className="h-3 w-3 mr-1" />
              Update
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="stripe_setup.dialog">
            <DialogHeader>
              <DialogTitle>Update Stripe Configuration</DialogTitle>
              <DialogDescription>
                Update your Stripe secret key and allowed countries.
              </DialogDescription>
            </DialogHeader>
            <StripeForm
              secretKey={secretKey}
              setSecretKey={setSecretKey}
              countries={countries}
              setCountries={setCountries}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="stripe_setup.cancel_button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || !secretKey.trim()}
                data-ocid="stripe_setup.save_button"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Configuration"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-4 rounded-lg border border-amber-400/50 bg-amber-50 dark:bg-amber-950/20"
      data-ocid="stripe_setup.panel"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
            Stripe payments are not configured.
          </p>
          <p className="text-xs text-amber-700/70 dark:text-amber-400/70 mt-0.5">
            Add your Stripe secret key to enable checkout for customers.
          </p>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="shrink-0"
            data-ocid="stripe_setup.open_modal_button"
          >
            Configure Stripe
          </Button>
        </DialogTrigger>
        <DialogContent data-ocid="stripe_setup.dialog">
          <DialogHeader>
            <DialogTitle>Configure Stripe Payments</DialogTitle>
            <DialogDescription>
              Enter your Stripe secret key to enable payment processing for
              company formations.
            </DialogDescription>
          </DialogHeader>
          <StripeForm
            secretKey={secretKey}
            setSecretKey={setSecretKey}
            countries={countries}
            setCountries={setCountries}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="stripe_setup.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !secretKey.trim()}
              data-ocid="stripe_setup.save_button"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Configuration"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StripeForm({
  secretKey,
  setSecretKey,
  countries,
  setCountries,
}: {
  secretKey: string;
  setSecretKey: (v: string) => void;
  countries: string;
  setCountries: (v: string) => void;
}) {
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="stripe-secret-key">Stripe Secret Key</Label>
        <Input
          id="stripe-secret-key"
          type="password"
          placeholder="sk_live_..."
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          data-ocid="stripe_setup.input"
        />
        <p className="text-xs text-muted-foreground">
          Find this in your{" "}
          <a
            href="https://dashboard.stripe.com/apikeys"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Stripe Dashboard
          </a>
          .
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="stripe-countries">Allowed Countries</Label>
        <Input
          id="stripe-countries"
          type="text"
          placeholder="GB, US, CA, AU, IE"
          value={countries}
          onChange={(e) => setCountries(e.target.value)}
          data-ocid="stripe_setup.input"
        />
        <p className="text-xs text-muted-foreground">
          Comma-separated ISO country codes (e.g. GB, US, CA).
        </p>
      </div>
    </div>
  );
}

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
              administrators can view orders.
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
          <p className="text-muted-foreground">
            View and manage all company formation orders
          </p>
        </div>
      </Section>

      <Section>
        <StripeSetupBanner />

        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
            <CardDescription>
              {orders ? `${orders.length} total orders` : "Loading orders..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div
                className="flex justify-center items-center py-12"
                data-ocid="orders.loading_state"
              >
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="rounded-md border" data-ocid="orders.table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Contact Email</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order, idx) => (
                      <TableRow
                        key={order.id.toString()}
                        data-ocid={`orders.item.${idx + 1}`}
                      >
                        <TableCell className="font-medium">
                          #{order.id.toString()}
                        </TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.companyName}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {order.packageSelected}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {order.contactEmail}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigate({
                                to: "/admin/orders/$orderId",
                                params: { orderId: order.id.toString() },
                              })
                            }
                            data-ocid={`orders.edit_button.${idx + 1}`}
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
              <div className="text-center py-12" data-ocid="orders.empty_state">
                <p className="text-muted-foreground">No orders found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
