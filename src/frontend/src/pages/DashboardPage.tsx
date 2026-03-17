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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CreditCard,
  Edit2,
  FileText,
  Filter,
  LayoutDashboard,
  LogIn,
  Minus,
  Package,
  PlusCircle,
  Receipt,
  Search,
  ShieldCheck,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { type OrderRecord, getOrders } from "../utils/orderHistory";

const additionalServices = [
  {
    icon: Building2,
    title: "Company Formation",
    description: "Register your UK limited company quickly and professionally.",
    href: "/services/company-formation",
  },
  {
    icon: ShieldCheck,
    title: "Registered Office",
    description:
      "Use our prestigious London address as your registered office.",
    href: "/services/registered-office",
  },
  {
    icon: Receipt,
    title: "VAT Registration",
    description:
      "Get VAT registered and start reclaiming on business expenses.",
    href: "/services/vat-registration",
  },
  {
    icon: Users,
    title: "PAYE Registration",
    description: "Set up PAYE to pay employees and directors through payroll.",
    href: "/services/paye-registration",
  },
  {
    icon: Briefcase,
    title: "Business Support",
    description: "Ongoing compliance, annual returns and business advice.",
    href: "/services/business-support",
  },
];

interface WalletTransaction {
  id: string;
  date: string;
  description: string;
  type: "credit" | "debit";
  amount: number;
  balanceAfter: number;
}

const initialTransactions: WalletTransaction[] = [
  {
    id: "txn-1",
    date: "2025-10-15",
    description: "Wallet Top-Up",
    type: "credit",
    amount: 50.0,
    balanceAfter: 50.0,
  },
  {
    id: "txn-2",
    date: "2025-10-22",
    description: "Company Formation — Basic Package",
    type: "debit",
    amount: 12.99,
    balanceAfter: 37.01,
  },
  {
    id: "txn-3",
    date: "2025-11-05",
    description: "Wallet Top-Up",
    type: "credit",
    amount: 25.0,
    balanceAfter: 62.01,
  },
  {
    id: "txn-4",
    date: "2025-11-18",
    description: "VAT Registration Service",
    type: "debit",
    amount: 49.99,
    balanceAfter: 12.02,
  },
  {
    id: "txn-5",
    date: "2025-12-01",
    description: "Wallet Top-Up",
    type: "credit",
    amount: 100.0,
    balanceAfter: 112.02,
  },
  {
    id: "txn-6",
    date: "2025-12-10",
    description: "Registered Office Service — Annual",
    type: "debit",
    amount: 37.02,
    balanceAfter: 75.0,
  },
];

// ─── Rich Order History Data ──────────────────────────────────────────────────
interface HistoryRow {
  id: string;
  no: number;
  service: string;
  company: string;
  date: string;
  payment: number | null;
  reminder: string;
  status: "completed" | "pending" | "processing";
  note: string;
}

const richOrderHistory: HistoryRow[] = [
  {
    id: "h10",
    no: 10,
    service: "VAT Registration",
    company: "ABC Limited",
    date: "17-03-2026",
    payment: 99,
    reminder: "VAT Return due in 9 days",
    status: "completed",
    note: "Click Update to amend VAT details with HMRC",
  },
  {
    id: "h9",
    no: 9,
    service: "Registered Office",
    company: "ABC Limited",
    date: "17-03-2026",
    payment: 119,
    reminder: "",
    status: "completed",
    note: "Summary available — click Update to review",
  },
  {
    id: "h8",
    no: 8,
    service: "Company Formation",
    company: "ABC Limited",
    date: "17-03-2026",
    payment: 199,
    reminder: "",
    status: "completed",
    note: "",
  },
  {
    id: "h7",
    no: 7,
    service: "VAT Registration",
    company: "BCD Limited",
    date: "18-02-2026",
    payment: 99,
    reminder: "",
    status: "processing",
    note: "",
  },
  {
    id: "h6",
    no: 6,
    service: "PAYE Registration",
    company: "XYZ Limited",
    date: "11-02-2026",
    payment: 79,
    reminder: "",
    status: "completed",
    note: "",
  },
  {
    id: "h5",
    no: 5,
    service: "Confirmation Statement",
    company: "XYZ Limited",
    date: "10-02-2026",
    payment: 49,
    reminder: "Confirmation Statement due in 8 days",
    status: "pending",
    note: "Reminder links directly to Companies House",
  },
  {
    id: "h4",
    no: 4,
    service: "Annual Accounts",
    company: "ABC Limited",
    date: "05-01-2026",
    payment: 149,
    reminder: "Annual Accounts due in 21 days",
    status: "pending",
    note: "We can provide info in chart form too",
  },
  {
    id: "h3",
    no: 3,
    service: "Mail Forwarding",
    company: "BCD Limited",
    date: "15-12-2025",
    payment: 59,
    reminder: "",
    status: "completed",
    note: "",
  },
  {
    id: "h2",
    no: 2,
    service: "Registered Office",
    company: "XYZ Limited",
    date: "01-12-2025",
    payment: 119,
    reminder: "",
    status: "completed",
    note: "",
  },
  {
    id: "h1",
    no: 1,
    service: "Company Formation",
    company: "XYZ Limited",
    date: "28-11-2025",
    payment: 199,
    reminder: "",
    status: "completed",
    note: "",
  },
];

const SERVICE_TYPES = [
  "Company Formation",
  "VAT Registration",
  "PAYE Registration",
  "Registered Office",
  "Confirmation Statement",
  "Annual Accounts",
  "Mail Forwarding",
  "Director Service Address",
  "Company Name Change",
  "Share Allotment",
];

function StatusBadge({ status }: { status: OrderRecord["status"] }) {
  if (status === "completed") {
    return (
      <Badge className="bg-primary/15 text-primary border-primary/25 hover:bg-primary/20">
        Completed
      </Badge>
    );
  }
  if (status === "pending") {
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
        Pending
      </Badge>
    );
  }
  return (
    <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
      Processing
    </Badge>
  );
}

function HistoryStatusBadge({ status }: { status: HistoryRow["status"] }) {
  if (status === "completed") {
    return (
      <Badge className="bg-primary/15 text-primary border-primary/25 hover:bg-primary/20 text-xs">
        Completed
      </Badge>
    );
  }
  if (status === "pending") {
    return (
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 text-xs">
        Pending
      </Badge>
    );
  }
  return (
    <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100 text-xs">
      Processing
    </Badge>
  );
}

export default function DashboardPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const orders = isAuthenticated ? getOrders() : [];

  // Wallet state
  const [walletBalance, setWalletBalance] = useState(75.0);
  const [walletTransactions, setWalletTransactions] =
    useState<WalletTransaction[]>(initialTransactions);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [showTopUp, setShowTopUp] = useState(false);

  // Order history filter state
  const [historyRows, setHistoryRows] =
    useState<HistoryRow[]>(richOrderHistory);
  const [historySearch, setHistorySearch] = useState("");
  const [historyStatus, setHistoryStatus] = useState("all");
  const [historyServiceType, setHistoryServiceType] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<HistoryRow | null>(null);

  // Derived filtered list
  const filteredHistory = historyRows.filter((row) => {
    const matchSearch =
      historySearch === "" ||
      row.service.toLowerCase().includes(historySearch.toLowerCase()) ||
      row.company.toLowerCase().includes(historySearch.toLowerCase());
    const matchStatus = historyStatus === "all" || row.status === historyStatus;
    const matchType =
      historyServiceType === "all" || row.service === historyServiceType;
    return matchSearch && matchStatus && matchType;
  });

  const historyTotalSpend = filteredHistory.reduce(
    (sum, r) => sum + (r.payment ?? 0),
    0,
  );

  function resetHistoryFilters() {
    setHistorySearch("");
    setHistoryStatus("all");
    setHistoryServiceType("all");
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setHistoryRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    toast.success(`"${deleteTarget.service}" removed from your history.`);
    setDeleteTarget(null);
  }

  function handleTopUp() {
    const amount = Number.parseFloat(topUpAmount);
    if (!amount || amount <= 0) return;
    const newBalance = walletBalance + amount;
    const newTx: WalletTransaction = {
      id: `txn-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      description: "Wallet Top-Up",
      type: "credit",
      amount,
      balanceAfter: newBalance,
    };
    setWalletBalance(newBalance);
    setWalletTransactions((prev) => [newTx, ...prev]);
    setTopUpAmount("");
    setShowTopUp(false);
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            className="max-w-md w-full text-center shadow-sm"
            data-ocid="dashboard.card"
          >
            <CardHeader className="pb-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">My Account</CardTitle>
              <CardDescription className="mt-2">
                Please log in to view your account and order history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() => login()}
                disabled={loginStatus === "logging-in"}
                data-ocid="dashboard.primary_button"
              >
                <LogIn className="h-4 w-4" />
                {loginStatus === "logging-in"
                  ? "Logging in..."
                  : "Log In to My Account"}
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                New to UK Formations?{" "}
                <Link
                  to="/start-formation"
                  className="text-muted-foreground underline hover:text-foreground"
                >
                  Start your company formation
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const totalPaid = orders.reduce((sum, o) => sum + o.amountPaid, 0);
  const activeServices = orders.filter((o) => o.status === "completed").length;
  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal
    ? `${principal.slice(0, 6)}...${principal.slice(-4)}`
    : "";

  const totalToppedUp = walletTransactions
    .filter((t) => t.type === "credit")
    .reduce((s, t) => s + t.amount, 0);
  const totalSpent = walletTransactions
    .filter((t) => t.type === "debit")
    .reduce((s, t) => s + t.amount, 0);

  const registeredDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <TooltipProvider>
      <div className="container py-10 max-w-5xl" data-ocid="dashboard.page">
        {/* Page Header with Account Overview */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: header + CTA */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-3xl mb-1">My Account</h1>
                <p className="text-muted-foreground text-sm">
                  Welcome back{shortPrincipal ? ` · ${shortPrincipal}` : ""}.
                  Here's your activity overview.
                </p>
              </div>
              <Button
                asChild
                size="sm"
                className="gap-2 self-start sm:self-auto"
              >
                <Link
                  to="/start-formation"
                  data-ocid="dashboard.primary_button"
                >
                  <Building2 className="h-4 w-4" />
                  Start New Formation
                </Link>
              </Button>
            </div>

            {/* Right: Account Overview card */}
            <div className="lg:w-72 shrink-0">
              <Card className="overflow-hidden shadow-sm border-primary/20">
                <div className="bg-primary/10 px-4 py-3 flex items-center gap-2 border-b border-primary/15">
                  <LayoutDashboard className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm text-primary">
                    Account Overview
                  </span>
                </div>
                <CardContent className="pt-4 pb-4 space-y-2.5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Principal</span>
                    <span className="font-mono text-xs font-medium">
                      {shortPrincipal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Balance</span>
                    <span className="font-bold text-primary">
                      £{walletBalance.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Credit Limit</span>
                    <span className="font-medium">£500.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Registered</span>
                    <span className="font-medium text-xs">
                      {registeredDate}
                    </span>
                  </div>
                  <div className="pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-2 text-xs border-primary/30 text-primary hover:bg-primary/5"
                      onClick={() => setShowTopUp(true)}
                      data-ocid="wallet.open_modal_button"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      Top Up Wallet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{orders.length}</p>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">£{totalPaid.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Total Paid</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeServices}</p>
                  <p className="text-xs text-muted-foreground">
                    Active Services
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    £{walletBalance.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Wallet Balance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Tabs defaultValue="services" data-ocid="dashboard.tab">
            <TabsList className="mb-6 flex-wrap h-auto gap-1">
              <TabsTrigger value="services" className="gap-2">
                <Building2 className="h-4 w-4" />
                My Services
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Order History
              </TabsTrigger>
              <TabsTrigger value="additional" className="gap-2">
                <Briefcase className="h-4 w-4" />
                Additional Services
              </TabsTrigger>
              <TabsTrigger value="wallet" className="gap-2">
                <Wallet className="h-4 w-4" />
                Wallet &amp; Finances
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: My Services */}
            <TabsContent value="services">
              {orders.length === 0 ? (
                <div
                  className="text-center py-16 rounded-lg border border-dashed border-border"
                  data-ocid="services.empty_state"
                >
                  <Building2 className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    No services yet
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
                    Start your company formation to see your activity here.
                  </p>
                  <Button asChild size="sm" className="gap-2">
                    <Link to="/start-formation">
                      <ArrowRight className="h-4 w-4" />
                      Start Company Formation
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead>Company Name</TableHead>
                        <TableHead>Service / Package</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount Paid</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, i) => (
                        <TableRow
                          key={order.id}
                          data-ocid={`services.item.${i + 1}`}
                        >
                          <TableCell className="font-medium">
                            {order.companyName}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{order.serviceType}</p>
                              <p className="text-xs text-muted-foreground">
                                {order.packageSelected}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell className="font-semibold text-primary">
                            £{order.amountPaid.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={order.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* Tab 2: Order History ─ Rich Filterable Table */}
            <TabsContent value="history">
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold">
                    List of services you have opted for
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Full history of all services, payments and reminders.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetHistoryFilters}
                  className="text-xs text-muted-foreground underline hover:text-foreground font-medium"
                  data-ocid="history.link"
                >
                  (all activity)
                </button>
              </div>

              {/* Filter bar */}
              <div
                className="flex flex-wrap gap-3 mb-4"
                data-ocid="history.panel"
              >
                <div className="relative flex-1 min-w-[180px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search service or company..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="pl-8 h-8 text-sm"
                    data-ocid="history.search_input"
                  />
                </div>
                <Select value={historyStatus} onValueChange={setHistoryStatus}>
                  <SelectTrigger
                    className="w-[140px] h-8 text-sm gap-1.5"
                    data-ocid="history.select"
                  >
                    <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={historyServiceType}
                  onValueChange={setHistoryServiceType}
                >
                  <SelectTrigger
                    className="w-[180px] h-8 text-sm"
                    data-ocid="history.select"
                  >
                    <SelectValue placeholder="Service Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Service Types</SelectItem>
                    {SERVICE_TYPES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/5"
                  onClick={resetHistoryFilters}
                  data-ocid="history.secondary_button"
                >
                  All Activity
                </Button>
              </div>

              {/* Table */}
              <div className="rounded-lg border border-border overflow-x-auto">
                {filteredHistory.length === 0 ? (
                  <div
                    className="text-center py-14"
                    data-ocid="history.empty_state"
                  >
                    <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium mb-1">
                      No matching services found
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Try adjusting your filters or{" "}
                      <button
                        type="button"
                        onClick={resetHistoryFilters}
                        className="text-primary hover:underline"
                      >
                        clear all filters
                      </button>
                    </p>
                  </div>
                ) : (
                  <Table data-ocid="history.table">
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead className="w-12 text-center text-xs">
                          No.
                        </TableHead>
                        <TableHead className="text-xs">Service Name</TableHead>
                        <TableHead className="text-xs">Company Name</TableHead>
                        <TableHead className="text-xs whitespace-nowrap">
                          Service Taken
                        </TableHead>
                        <TableHead className="text-xs">Payment</TableHead>
                        <TableHead className="text-xs min-w-[180px]">
                          Reminder
                        </TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                        <TableHead className="text-xs">Action</TableHead>
                        <TableHead className="text-xs min-w-[160px]">
                          Notes
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHistory.map((row, i) => (
                        <TableRow
                          key={row.id}
                          className="hover:bg-muted/20 transition-colors align-top"
                          data-ocid={`history.item.${i + 1}`}
                        >
                          {/* No. */}
                          <TableCell className="text-center">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                              {row.no}
                            </span>
                          </TableCell>

                          {/* Service Name */}
                          <TableCell>
                            <span className="text-foreground font-medium text-sm hover:underline cursor-pointer">
                              {row.service}
                            </span>
                          </TableCell>

                          {/* Company Name */}
                          <TableCell>
                            <span className="text-muted-foreground font-medium text-sm hover:underline cursor-pointer">
                              {row.company}
                            </span>
                          </TableCell>

                          {/* Date */}
                          <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                            {row.date}
                          </TableCell>

                          {/* Payment */}
                          <TableCell className="text-sm font-semibold">
                            {row.payment != null ? (
                              <span className="text-foreground font-semibold">
                                £{row.payment}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>

                          {/* Reminder */}
                          <TableCell>
                            {row.reminder ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-start gap-1.5 cursor-pointer">
                                    <Bell className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                                    <span className="text-xs text-amber-600 font-medium leading-tight">
                                      {row.reminder}
                                    </span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-xs">
                                  Click to go to relevant page
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <span className="text-muted-foreground text-xs">
                                —
                              </span>
                            )}
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            <HistoryStatusBadge status={row.status} />
                          </TableCell>

                          {/* Action */}
                          <TableCell>
                            <div className="flex gap-1.5">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/5"
                                onClick={() =>
                                  toast.info(
                                    "Redirecting to update service...",
                                    { duration: 2500 },
                                  )
                                }
                                data-ocid={`history.edit_button.${i + 1}`}
                              >
                                <Edit2 className="h-3 w-3" />
                                Update
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-xs gap-1 border-destructive/30 text-destructive hover:bg-destructive/5"
                                onClick={() => setDeleteTarget(row)}
                                data-ocid={`history.delete_button.${i + 1}`}
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>

                          {/* Notes */}
                          <TableCell>
                            {row.note ? (
                              <p className="text-xs text-muted-foreground leading-snug max-w-[200px]">
                                {row.note}
                              </p>
                            ) : (
                              <span className="text-muted-foreground text-xs">
                                —
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              {/* Summary bar */}
              <div className="flex items-center justify-between mt-3 px-1">
                <p className="text-xs text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {filteredHistory.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {historyRows.length}
                  </span>{" "}
                  services
                </p>
                <p className="text-xs font-semibold text-foreground">
                  Total: £{historyTotalSpend.toLocaleString()}
                </p>
              </div>
            </TabsContent>

            {/* Tab 3: Additional Services */}
            <TabsContent value="additional">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Available Services</h2>
                  <p className="text-muted-foreground text-sm">
                    Explore our full range of company services.
                  </p>
                </div>
                <Button asChild size="sm" className="gap-2">
                  <Link
                    to="/start-formation"
                    data-ocid="additional.primary_button"
                  >
                    <Building2 className="h-4 w-4" />
                    New Formation
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {additionalServices.map((service, i) => {
                  const Icon = service.icon;
                  return (
                    <Card
                      key={service.href}
                      className="group hover:border-primary/40 transition-colors"
                      data-ocid={`additional.item.${i + 1}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-base">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="gap-2 w-full"
                        >
                          <Link
                            to={service.href}
                            data-ocid={`additional.secondary_button.${i + 1}`}
                          >
                            Learn More
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Tab 4: Wallet & Finances */}
            <TabsContent value="wallet" data-ocid="wallet.panel">
              {/* Wallet Balance Hero */}
              <Card className="mb-6 overflow-hidden border-primary/20">
                <div className="bg-primary/8 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
                      <Wallet className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">
                        Available Balance
                      </p>
                      <p className="text-4xl font-bold text-primary">
                        £{walletBalance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="gap-2 self-start sm:self-auto"
                    onClick={() => setShowTopUp((v) => !v)}
                    data-ocid="wallet.primary_button"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Top Up Wallet
                  </Button>
                </div>

                {/* Top-Up Form */}
                {showTopUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-primary/10 bg-muted/20 px-6 py-5"
                    data-ocid="wallet.modal"
                  >
                    <h3 className="font-semibold text-sm mb-3">
                      Add Funds to Wallet
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[5, 10, 20, 50].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setTopUpAmount(String(amt))}
                          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                            topUpAmount === String(amt)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border hover:border-primary/40 hover:bg-primary/5"
                          }`}
                          data-ocid={"wallet.toggle"}
                        >
                          £{amt}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 max-w-sm">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          £
                        </span>
                        <Input
                          type="number"
                          min="1"
                          step="0.01"
                          placeholder="Custom amount"
                          value={topUpAmount}
                          onChange={(e) => setTopUpAmount(e.target.value)}
                          className="pl-7"
                          data-ocid="wallet.input"
                        />
                      </div>
                      <Button
                        onClick={handleTopUp}
                        disabled={
                          !topUpAmount || Number.parseFloat(topUpAmount) <= 0
                        }
                        data-ocid="wallet.submit_button"
                      >
                        Add Funds
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowTopUp(false);
                          setTopUpAmount("");
                        }}
                        data-ocid="wallet.cancel_button"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </Card>

              {/* Spending Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="border-emerald-200/60">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-emerald-700">
                          £{totalToppedUp.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Total Topped Up
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-rose-200/60">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                        <TrendingDown className="h-5 w-5 text-rose-500" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-rose-600">
                          £{totalSpent.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Total Spent
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Wallet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-primary">
                          £{walletBalance.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Available Balance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction History */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    Transaction History
                  </CardTitle>
                  <CardDescription className="text-xs">
                    All wallet activity — top-ups and service payments.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {walletTransactions.length === 0 ? (
                    <div
                      className="text-center py-12"
                      data-ocid="wallet.empty_state"
                    >
                      <Wallet className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        No transactions yet. Top up your wallet to get started.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-b-lg overflow-hidden">
                      <Table data-ocid="wallet.table">
                        <TableHeader>
                          <TableRow className="bg-muted/30">
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">
                              Balance After
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {walletTransactions.map((tx, i) => (
                            <TableRow
                              key={tx.id}
                              data-ocid={`wallet.item.${i + 1}`}
                            >
                              <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                                {new Date(tx.date).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </TableCell>
                              <TableCell className="text-sm font-medium">
                                {tx.description}
                              </TableCell>
                              <TableCell>
                                {tx.type === "credit" ? (
                                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    Credit
                                  </Badge>
                                ) : (
                                  <Badge className="bg-rose-100 text-rose-600 border-rose-200 hover:bg-rose-100 gap-1">
                                    <TrendingDown className="h-3 w-3" />
                                    Debit
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell
                                className={`text-right font-semibold text-sm ${
                                  tx.type === "credit"
                                    ? "text-emerald-600"
                                    : "text-rose-500"
                                }`}
                              >
                                {tx.type === "credit" ? "+" : "-"}£
                                {tx.amount.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-right text-sm font-medium">
                                £{tx.balanceAfter.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Footer note */}
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Wallet funds can be used to pay for any UK Formations service at
                checkout.
              </p>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
        >
          <DialogContent data-ocid="history.dialog">
            <DialogHeader>
              <DialogTitle>Delete Service Record</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove{" "}
                <strong>{deleteTarget?.service}</strong> for{" "}
                <strong>{deleteTarget?.company}</strong> from your history? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                data-ocid="history.cancel_button"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                data-ocid="history.confirm_button"
              >
                Delete Record
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
