import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Building2, ChevronDown, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { useGetCallerUserRole } from "../../hooks/useQueries";

export default function SiteLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity, clear, login, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: userRole } = useGetCallerUserRole();

  const isAuthenticated = !!identity;
  const isAdmin = userRole === "admin";

  const handleLogout = async () => {
    await clear();
    navigate({ to: "/" });
  };

  const handleLogin = async () => {
    await login();
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/pricing", label: "Pricing" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  const servicesLinks = [
    { to: "/services", label: "All Services" },
    { to: "/services/company-formation", label: "Company Formation" },
    { to: "/services/registered-office", label: "Registered Office" },
    { to: "/services/business-support", label: "Business Support" },
  ];

  const taxComplianceLinks = [
    { to: "/services/vat-registration", label: "VAT Registration" },
    { to: "/services/paye-registration", label: "PAYE Registration" },
  ];

  const adminLinks = [
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/export", label: "Export" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/assets/generated/uk-formations-logo.dim_512x512.png"
              alt="UK Formations"
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget
                  .nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div
              style={{ display: "none" }}
              className="h-10 items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">UK Formations</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}
                data-ocid="nav.dashboard.link"
              >
                My Account
              </Link>
            )}

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none">
                Services
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {servicesLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link to={link.to} className="w-full cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Tax &amp; Compliance
                </div>
                {taxComplianceLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link to={link.to} className="w-full cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isAdmin &&
              adminLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{ className: "text-foreground" }}
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <Link to="/dashboard" data-ocid="header.dashboard.button">
                    <LayoutDashboard className="h-4 w-4" />
                    My Account
                  </Link>
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  data-ocid="header.logout.button"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogin}
                variant="outline"
                size="sm"
                disabled={loginStatus === "logging-in"}
                data-ocid="header.login.button"
              >
                {loginStatus === "logging-in" ? "Logging in..." : "Login"}
              </Button>
            )}
            <Button asChild size="sm">
              <Link to="/formation-wizard">Start Formation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="container py-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                  data-ocid="nav.mobile.dashboard.link"
                >
                  My Account
                </Link>
              )}

              {/* Services submenu in mobile */}
              <div className="border-t pt-2">
                <p className="text-sm font-semibold mb-2">Services</p>
                {servicesLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 pl-4 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <p className="text-xs font-semibold text-muted-foreground mt-3 mb-1 pl-4">
                  Tax &amp; Compliance
                </p>
                {taxComplianceLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 pl-4 block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {isAdmin && (
                <div className="border-t pt-2">
                  <p className="text-sm font-semibold mb-2">Admin</p>
                  {adminLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 pl-4 block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
              <div className="pt-3 space-y-2 border-t">
                {isAuthenticated ? (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full gap-2"
                      size="sm"
                    >
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        My Account
                      </Link>
                    </Button>
                    <Button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full"
                      size="sm"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      handleLogin();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full"
                    size="sm"
                    disabled={loginStatus === "logging-in"}
                  >
                    {loginStatus === "logging-in" ? "Logging in..." : "Login"}
                  </Button>
                )}
                <Button asChild className="w-full" size="sm">
                  <Link
                    to="/formation-wizard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Formation
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/generated/uk-formations-logo.dim_512x512.png"
                  alt="UK Formations"
                  className="h-8 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget
                      .nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div style={{ display: "none" }} className="items-center gap-2">
                  <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-bold">UK Formations</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional UK company formation services made simple.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/services"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    All Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/company-formation"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Company Formation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/registered-office"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Registered Office
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/business-support"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Business Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/vat-registration"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    VAT Registration
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/paye-registration"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    PAYE Registration
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/name-check"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Name Check
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} UK Formations. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  aria-label="X (Twitter)"
                >
                  X
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                Built with{" "}
                <span className="text-red-500" aria-label="love">
                  ♥
                </span>{" "}
                using{" "}
                <a
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "uk-formations")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline underline-offset-2"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
