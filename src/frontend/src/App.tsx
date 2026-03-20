import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import SiteLayout from "./components/layout/SiteLayout";
import AccountPage from "./pages/AccountPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import FaqPage from "./pages/FaqPage";
import FormationWizardPage from "./pages/FormationWizardPage";
import HomePage from "./pages/HomePage";
import HowItWorksPage from "./pages/HowItWorksPage";
import NameCheckPage from "./pages/NameCheckPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import PaymentFailurePage from "./pages/PaymentFailurePage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PricingPage from "./pages/PricingPage";
import ServicesPage from "./pages/ServicesPage";
import StartFormationPage from "./pages/StartFormationPage";
import AdminExportPage from "./pages/admin/AdminExportPage";
import AdminOrderDetailPage from "./pages/admin/AdminOrderDetailPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/legal/TermsOfServicePage";
import AdditionalServicesPage from "./pages/services/AdditionalServicesPage";
import AddressServicesPage from "./pages/services/AddressServicesPage";
import BusinessSupportServicePage from "./pages/services/BusinessSupportServicePage";
import BusinessTelephoneServicePage from "./pages/services/BusinessTelephoneServicePage";
import CompanyFormationServicePage from "./pages/services/CompanyFormationServicePage";
import PAYERegistrationServicePage from "./pages/services/PAYERegistrationServicePage";
import RegisteredOfficeServicePage from "./pages/services/RegisteredOfficeServicePage";
import VATRegistrationServicePage from "./pages/services/VATRegistrationServicePage";

const rootRoute = createRootRoute({ component: SiteLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: PricingPage,
});
const howItWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/how-it-works",
  component: HowItWorksPage,
});
const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faq",
  component: FaqPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPolicyPage,
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsOfServicePage,
});
const wizardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/formation-wizard",
  component: FormationWizardPage,
});
const confirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/confirmation",
  component: OrderConfirmationPage,
});
const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: AdminOrdersPage,
});
const adminOrderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders/$orderId",
  component: AdminOrderDetailPage,
});
const adminExportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/export",
  component: AdminExportPage,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});
const companyFormationServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/company-formation",
  component: CompanyFormationServicePage,
});
const registeredOfficeServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/registered-office",
  component: RegisteredOfficeServicePage,
});
const businessSupportServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/business-support",
  component: BusinessSupportServicePage,
});
const vatRegistrationServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/vat-registration",
  component: VATRegistrationServicePage,
});
const payeRegistrationServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/paye-registration",
  component: PAYERegistrationServicePage,
});
const addressServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/address-services",
  component: AddressServicesPage,
});
const businessTelephoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/business-telephone",
  component: BusinessTelephoneServicePage,
});
const additionalServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/additional-services",
  component: AdditionalServicesPage,
});
const nameCheckRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/name-check",
  component: NameCheckPage,
});
const startFormationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/start-formation",
  component: StartFormationPage,
});
const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-success",
  component: PaymentSuccessPage,
});
const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-failure",
  component: PaymentFailurePage,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});
const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  pricingRoute,
  howItWorksRoute,
  faqRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
  wizardRoute,
  confirmationRoute,
  adminOrdersRoute,
  adminOrderDetailRoute,
  adminExportRoute,
  servicesRoute,
  companyFormationServiceRoute,
  registeredOfficeServiceRoute,
  businessSupportServiceRoute,
  vatRegistrationServiceRoute,
  payeRegistrationServiceRoute,
  addressServicesRoute,
  businessTelephoneRoute,
  additionalServicesRoute,
  nameCheckRoute,
  startFormationRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  dashboardRoute,
  accountRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
