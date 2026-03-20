import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const COUNTRIES = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Ireland",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Switzerland",
  "Austria",
  "Poland",
  "Portugal",
  "Greece",
  "India",
  "China",
  "Japan",
  "South Korea",
  "Singapore",
  "Hong Kong",
  "United Arab Emirates",
  "South Africa",
  "Brazil",
  "Mexico",
  "New Zealand",
  "Other",
];

function checkPasswordStrength(password: string) {
  return {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
    minLength: password.length >= 8,
  };
}

export default function AccountPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regForm, setRegForm] = useState({
    organisation: "",
    title: "",
    forename: "",
    surname: "",
    phone: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    houseNumber: "",
    street: "",
    locality: "",
    town: "",
    county: "",
    postCode: "",
    country: "",
    newsletter: false,
    partnerUpdates: false,
    termsAgreed: false,
  });
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = checkPasswordStrength(regForm.password);
  const passwordStrengthScore =
    Object.values(passwordStrength).filter(Boolean).length;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login();
  };

  const validateRegForm = () => {
    const errors: Record<string, string> = {};
    if (!regForm.title) errors.title = "Title is required";
    if (!regForm.forename.trim()) errors.forename = "Forename is required";
    if (!regForm.surname.trim()) errors.surname = "Surname is required";
    if (!regForm.phone.trim()) errors.phone = "Phone number is required";
    if (!regForm.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email))
      errors.email = "Invalid email address";
    if (regForm.confirmEmail !== regForm.email)
      errors.confirmEmail = "Emails do not match";
    if (!regForm.password) errors.password = "Password is required";
    else if (!Object.values(passwordStrength).every(Boolean))
      errors.password = "Password does not meet all requirements";
    if (regForm.confirmPassword !== regForm.password)
      errors.confirmPassword = "Passwords do not match";
    if (!regForm.houseNumber.trim())
      errors.houseNumber = "House name/number is required";
    if (!regForm.street.trim()) errors.street = "Street is required";
    if (!regForm.town.trim()) errors.town = "Town is required";
    if (!regForm.postCode.trim()) errors.postCode = "Post code is required";
    if (!regForm.country) errors.country = "Country is required";
    if (!regForm.termsAgreed)
      errors.termsAgreed = "You must agree to the Terms and Conditions";
    return errors;
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateRegForm();
    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      toast.error("Please correct the errors and try again.");
      return;
    }
    setIsSubmitting(true);
    // Store in localStorage as mock data
    const accountData = {
      ...regForm,
      registeredAt: new Date().toISOString(),
      id: Math.random().toString(36).substring(2),
    };
    localStorage.setItem("ukf_account", JSON.stringify(accountData));
    toast.success("Account created successfully! Welcome to UK Formations.");
    setTimeout(() => {
      navigate({ to: "/dashboard" });
    }, 800);
    setIsSubmitting(false);
  };

  const setField = (field: string, value: string | boolean) => {
    setRegForm((prev) => ({ ...prev, [field]: value }));
    setRegErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const strengthLabel = ["Very Weak", "Weak", "Fair", "Good", "Strong"][
    passwordStrengthScore
  ];
  const strengthColor = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-lime-500",
    "bg-primary",
  ][passwordStrengthScore];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-muted-foreground mt-1">
            Log in to manage your company formations and services, or create a
            new account.
          </p>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-xl shadow-sm border overflow-hidden">
          {/* ===== LEFT: LOGIN ===== */}
          <div className="p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Account Login
              </h2>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Welcome back. Log in to access your dashboard, orders, and
              services.
            </p>

            <form
              onSubmit={handleLoginSubmit}
              className="space-y-4"
              data-ocid="login.form"
            >
              <div className="space-y-1.5">
                <Label htmlFor="login-email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-9"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    data-ocid="login.email.input"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="login-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </Label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() =>
                      toast.info("Password reset email would be sent.")
                    }
                  >
                    Forgotten Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-9 pr-10"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    data-ocid="login.password.input"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowLoginPassword((v) => !v)}
                    aria-label="Toggle password visibility"
                  >
                    {showLoginPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loginStatus === "logging-in"}
                data-ocid="login.submit_button"
              >
                {loginStatus === "logging-in" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-muted-foreground text-center">
                By logging in you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Secure", sub: "256-bit SSL" },
                { label: "Trusted", sub: "10,000+ customers" },
                { label: "Fast", sub: "Same day formation" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="bg-gray-50 rounded-lg p-3 text-center border"
                >
                  <p className="text-xs font-semibold text-gray-700">
                    {badge.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {badge.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:flex">
            <Separator orientation="vertical" className="h-auto" />
          </div>
          <div className="lg:hidden">
            <Separator orientation="horizontal" />
          </div>

          {/* ===== RIGHT: REGISTER ===== */}
          <div className="p-8 lg:p-10 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Not a customer?
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Create a new account to manage your company formation, track your
              orders, and access exclusive services.
            </p>

            <form
              onSubmit={handleRegSubmit}
              className="space-y-5"
              data-ocid="register.form"
            >
              {/* Account Holder Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b pb-2">
                  Account Holder
                </h3>

                <div className="space-y-1.5">
                  <Label className="text-sm">Organisation (optional)</Label>
                  <Input
                    placeholder="Company or organisation name"
                    value={regForm.organisation}
                    onChange={(e) => setField("organisation", e.target.value)}
                    data-ocid="register.organisation.input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={regForm.title}
                      onValueChange={(v) => setField("title", v)}
                    >
                      <SelectTrigger data-ocid="register.title.select">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Mr",
                          "Mrs",
                          "Miss",
                          "Ms",
                          "Dr",
                          "Sir",
                          "Madam",
                          "Lord",
                          "Lady",
                        ].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {regErrors.title && (
                      <p
                        className="text-xs text-red-500"
                        data-ocid="register.title.error_state"
                      >
                        {regErrors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      Forename <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="First name"
                      value={regForm.forename}
                      onChange={(e) => setField("forename", e.target.value)}
                      data-ocid="register.forename.input"
                    />
                    {regErrors.forename && (
                      <p
                        className="text-xs text-red-500"
                        data-ocid="register.forename.error_state"
                      >
                        {regErrors.forename}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">
                    Surname <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="Last name"
                    value={regForm.surname}
                    onChange={(e) => setField("surname", e.target.value)}
                    data-ocid="register.surname.input"
                  />
                  {regErrors.surname && (
                    <p
                      className="text-xs text-red-500"
                      data-ocid="register.surname.error_state"
                    >
                      {regErrors.surname}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    placeholder="e.g. +44 7700 900000"
                    value={regForm.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    data-ocid="register.phone.input"
                  />
                  {regErrors.phone && (
                    <p className="text-xs text-red-500">{regErrors.phone}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={regForm.email}
                      onChange={(e) => setField("email", e.target.value)}
                      data-ocid="register.email.input"
                    />
                    {regErrors.email && (
                      <p
                        className="text-xs text-red-500"
                        data-ocid="register.email.error_state"
                      >
                        {regErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      Confirm Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder="Repeat email"
                      value={regForm.confirmEmail}
                      onChange={(e) => setField("confirmEmail", e.target.value)}
                      data-ocid="register.confirm_email.input"
                    />
                    {regErrors.confirmEmail && (
                      <p
                        className="text-xs text-red-500"
                        data-ocid="register.confirm_email.error_state"
                      >
                        {regErrors.confirmEmail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label className="text-sm">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showRegPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      value={regForm.password}
                      onChange={(e) => setField("password", e.target.value)}
                      className="pr-10"
                      data-ocid="register.password.input"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowRegPassword((v) => !v)}
                      aria-label="Toggle password visibility"
                    >
                      {showRegPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {regErrors.password && (
                    <p
                      className="text-xs text-red-500"
                      data-ocid="register.password.error_state"
                    >
                      {regErrors.password}
                    </p>
                  )}

                  {/* Password strength indicator */}
                  {regForm.password.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                            style={{
                              width: `${(passwordStrengthScore / 5) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-16 text-right">
                          {strengthLabel}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {(
                          [
                            ["uppercase", "At least one uppercase character"],
                            ["lowercase", "At least one lowercase character"],
                            ["number", "At least one number"],
                            ["symbol", "At least one symbol"],
                            ["minLength", "Minimum 8 characters"],
                          ] as const
                        ).map(([key, label]) => (
                          <li key={key} className="flex items-center gap-1.5">
                            {passwordStrength[key] ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                            ) : (
                              <Circle className="h-3.5 w-3.5 text-gray-300 shrink-0" />
                            )}
                            <span
                              className={`text-xs ${
                                passwordStrength[key]
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat password"
                      value={regForm.confirmPassword}
                      onChange={(e) =>
                        setField("confirmPassword", e.target.value)
                      }
                      className="pr-10"
                      data-ocid="register.confirm_password.input"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      aria-label="Toggle password visibility"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {regErrors.confirmPassword && (
                    <p
                      className="text-xs text-red-500"
                      data-ocid="register.confirm_password.error_state"
                    >
                      {regErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Primary Address */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b pb-2">
                  Primary Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      House Name / Number{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="e.g. 12 or Hillside House"
                      value={regForm.houseNumber}
                      onChange={(e) => setField("houseNumber", e.target.value)}
                      data-ocid="register.house_number.input"
                    />
                    {regErrors.houseNumber && (
                      <p className="text-xs text-red-500">
                        {regErrors.houseNumber}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      Street <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Street name"
                      value={regForm.street}
                      onChange={(e) => setField("street", e.target.value)}
                      data-ocid="register.street.input"
                    />
                    {regErrors.street && (
                      <p className="text-xs text-red-500">{regErrors.street}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Locality (optional)</Label>
                  <Input
                    placeholder="Village, district or area"
                    value={regForm.locality}
                    onChange={(e) => setField("locality", e.target.value)}
                    data-ocid="register.locality.input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      Town <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Town or city"
                      value={regForm.town}
                      onChange={(e) => setField("town", e.target.value)}
                      data-ocid="register.town.input"
                    />
                    {regErrors.town && (
                      <p className="text-xs text-red-500">{regErrors.town}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">County (optional)</Label>
                    <Input
                      placeholder="e.g. Surrey"
                      value={regForm.county}
                      onChange={(e) => setField("county", e.target.value)}
                      data-ocid="register.county.input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      Post Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="e.g. SW1A 1AA"
                      value={regForm.postCode}
                      onChange={(e) => setField("postCode", e.target.value)}
                      data-ocid="register.post_code.input"
                    />
                    {regErrors.postCode && (
                      <p className="text-xs text-red-500">
                        {regErrors.postCode}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      Country <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={regForm.country}
                      onValueChange={(v) => setField("country", v)}
                    >
                      <SelectTrigger data-ocid="register.country.select">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {COUNTRIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {regErrors.country && (
                      <p className="text-xs text-red-500">
                        {regErrors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b pb-2">
                  Preferences
                </h3>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="newsletter"
                    checked={regForm.newsletter}
                    onCheckedChange={(v) => setField("newsletter", !!v)}
                    data-ocid="register.newsletter.checkbox"
                  />
                  <Label
                    htmlFor="newsletter"
                    className="text-sm text-muted-foreground cursor-pointer leading-snug"
                  >
                    Subscribe to our newsletter for the latest company formation
                    news and offers.
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="partnerUpdates"
                    checked={regForm.partnerUpdates}
                    onCheckedChange={(v) => setField("partnerUpdates", !!v)}
                    data-ocid="register.partner_updates.checkbox"
                  />
                  <Label
                    htmlFor="partnerUpdates"
                    className="text-sm text-muted-foreground cursor-pointer leading-snug"
                  >
                    I would like to receive updates on products and services
                    from our trusted business partners.
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="termsAgreed"
                    checked={regForm.termsAgreed}
                    onCheckedChange={(v) => setField("termsAgreed", !!v)}
                    data-ocid="register.terms.checkbox"
                  />
                  <Label
                    htmlFor="termsAgreed"
                    className="text-sm cursor-pointer leading-snug"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms &amp; Conditions
                    </Link>{" "}
                    &amp;{" "}
                    <Link
                      to="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    . <span className="text-red-500">*</span>
                  </Label>
                </div>
                {regErrors.termsAgreed && (
                  <p
                    className="text-xs text-red-500"
                    data-ocid="register.terms.error_state"
                  >
                    {regErrors.termsAgreed}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                data-ocid="register.submit_button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() =>
                    document
                      .getElementById("login-email")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Login here
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
