import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsOfServicePage from './pages/legal/TermsOfServicePage';
import FormationWizardPage from './pages/FormationWizardPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderDetailPage from './pages/admin/AdminOrderDetailPage';
import AdminExportPage from './pages/admin/AdminExportPage';
import ServicesPage from './pages/ServicesPage';
import CompanyFormationServicePage from './pages/services/CompanyFormationServicePage';
import RegisteredOfficeServicePage from './pages/services/RegisteredOfficeServicePage';
import BusinessSupportServicePage from './pages/services/BusinessSupportServicePage';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: PricingPage,
});

const howItWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/how-it-works',
  component: HowItWorksPage,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faq',
  component: FaqPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsOfServicePage,
});

const wizardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/formation-wizard',
  component: FormationWizardPage,
});

const confirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/confirmation',
  component: OrderConfirmationPage,
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/orders',
  component: AdminOrdersPage,
});

const adminOrderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/orders/$orderId',
  component: AdminOrderDetailPage,
});

const adminExportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/export',
  component: AdminExportPage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
});

const companyFormationServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/company-formation',
  component: CompanyFormationServicePage,
});

const registeredOfficeServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/registered-office',
  component: RegisteredOfficeServicePage,
});

const businessSupportServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/business-support',
  component: BusinessSupportServicePage,
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
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
