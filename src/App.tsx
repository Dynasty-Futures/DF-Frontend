import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense, ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import { env } from "@/config/env";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleGuard from "@/components/auth/RoleGuard";
import { getPerfFlags } from "@/lib/perfFlags";

// Keep home route eagerly loaded; lazy-load the rest.
import Index from "./pages/Index";
const Pricing = lazy(() => import("./pages/Pricing"));
const Rules = lazy(() => import("./pages/Rules"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Support = lazy(() => import("./pages/Support"));
const Legal = lazy(() => import("./pages/Legal"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const About = lazy(() => import("./pages/About"));
const Payouts = lazy(() => import("./pages/Payouts"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminOverview = lazy(() =>
  import("./components/admin/tabs/AdminOverview").then((module) => ({
    default: module.AdminOverview,
  })),
);
const AdminAccounts = lazy(() =>
  import("./components/admin/tabs/AdminAccounts").then((module) => ({
    default: module.AdminAccounts,
  })),
);
const AdminRiskFlags = lazy(() =>
  import("./components/admin/tabs/AdminRiskFlags").then((module) => ({
    default: module.AdminRiskFlags,
  })),
);
const AdminPayouts = lazy(() =>
  import("./components/admin/tabs/AdminPayouts").then((module) => ({
    default: module.AdminPayouts,
  })),
);
const AdminUsersKYC = lazy(() =>
  import("./components/admin/tabs/AdminUsersKYC").then((module) => ({
    default: module.AdminUsersKYC,
  })),
);
const AdminCompliance = lazy(() =>
  import("./components/admin/tabs/AdminCompliance").then((module) => ({
    default: module.AdminCompliance,
  })),
);
const AdminBilling = lazy(() =>
  import("./components/admin/tabs/AdminBilling").then((module) => ({
    default: module.AdminBilling,
  })),
);
const AdminAuditLog = lazy(() =>
  import("./components/admin/tabs/AdminAuditLog").then((module) => ({
    default: module.AdminAuditLog,
  })),
);
const AdminSystemHealth = lazy(() =>
  import("./components/admin/tabs/AdminSystemHealth").then((module) => ({
    default: module.AdminSystemHealth,
  })),
);
const AdminSettings = lazy(() =>
  import("./components/admin/tabs/AdminSettings").then((module) => ({
    default: module.AdminSettings,
  })),
);
const AdminSupport = lazy(() =>
  import("./components/admin/tabs/AdminSupport").then((module) => ({
    default: module.AdminSupport,
  })),
);
const AdminAnnouncements = lazy(() =>
  import("./components/admin/tabs/AdminAnnouncements").then((module) => ({
    default: module.AdminAnnouncements,
  })),
);
const AdminProducts = lazy(() =>
  import("./components/admin/tabs/AdminProducts").then((module) => ({
    default: module.AdminProducts,
  })),
);
const AdminIntegrations = lazy(() =>
  import("./components/admin/tabs/AdminIntegrations").then((module) => ({
    default: module.AdminIntegrations,
  })),
);
const AdminSecurity = lazy(() =>
  import("./components/admin/tabs/AdminSecurity").then((module) => ({
    default: module.AdminSecurity,
  })),
);

const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const DashboardAccounts = lazy(() => import("./pages/dashboard/DashboardAccounts"));
const DashboardBilling = lazy(() => import("./pages/dashboard/DashboardBilling"));
const DashboardPayouts = lazy(() => import("./pages/dashboard/DashboardPayouts"));
const DashboardProfile = lazy(() => import("./pages/dashboard/DashboardProfile"));
const DashboardAchievements = lazy(() => import("./pages/dashboard/DashboardAchievements"));
const DashboardHelp = lazy(() => import("./pages/dashboard/DashboardHelp"));
const DashboardAffiliate = lazy(() => import("./pages/dashboard/DashboardAffiliate"));
const DashboardJournal = lazy(() => import("./pages/dashboard/DashboardJournal"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes before data is considered stale
      retry: 1,                  // Retry failed queries once
      refetchOnWindowFocus: true, // Refresh data when user tabs back
    },
    mutations: {
      retry: 0, // Don't retry failed mutations (user should re-trigger)
    },
  },
});

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

const LazyRoute = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={null}>{children}</Suspense>
);

/**
 * AppRoutes contains all route definitions. Exported separately so the
 * prerender script can wrap it in StaticRouter instead of BrowserRouter.
 */
export const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Index />} />
    <Route path="/pricing" element={<LazyRoute><Pricing /></LazyRoute>} />
    <Route path="/rules" element={<LazyRoute><Rules /></LazyRoute>} />
    <Route path="/faq" element={<LazyRoute><FAQ /></LazyRoute>} />
    <Route path="/support" element={<LazyRoute><Support /></LazyRoute>} />
    <Route path="/legal" element={<LazyRoute><Legal /></LazyRoute>} />
    <Route path="/login" element={<LazyRoute><Login /></LazyRoute>} />
    <Route path="/register" element={<LazyRoute><Register /></LazyRoute>} />
    <Route path="/about" element={<LazyRoute><About /></LazyRoute>} />
    <Route path="/payouts" element={<LazyRoute><Payouts /></LazyRoute>} />

    {/* Admin Routes — requires ADMIN role */}
    <Route path="/admin" element={
      <RoleGuard roles={['ADMIN']}>
        <LazyRoute>
          <AdminPage />
        </LazyRoute>
      </RoleGuard>
    }>
      <Route index element={<LazyRoute><AdminOverview /></LazyRoute>} />
      <Route path="accounts" element={<LazyRoute><AdminAccounts /></LazyRoute>} />
      <Route path="risk" element={<LazyRoute><AdminRiskFlags /></LazyRoute>} />
      <Route path="payouts" element={<LazyRoute><AdminPayouts /></LazyRoute>} />
      <Route path="users" element={<LazyRoute><AdminUsersKYC /></LazyRoute>} />
      <Route path="compliance" element={<LazyRoute><AdminCompliance /></LazyRoute>} />
      <Route path="billing" element={<LazyRoute><AdminBilling /></LazyRoute>} />
      <Route path="audit" element={<LazyRoute><AdminAuditLog /></LazyRoute>} />
      <Route path="health" element={<LazyRoute><AdminSystemHealth /></LazyRoute>} />
      <Route path="settings" element={<LazyRoute><AdminSettings /></LazyRoute>} />
      <Route path="support" element={<LazyRoute><AdminSupport /></LazyRoute>} />
      <Route path="announcements" element={<LazyRoute><AdminAnnouncements /></LazyRoute>} />
      <Route path="products" element={<LazyRoute><AdminProducts /></LazyRoute>} />
      <Route path="integrations" element={<LazyRoute><AdminIntegrations /></LazyRoute>} />
      <Route path="security" element={<LazyRoute><AdminSecurity /></LazyRoute>} />
    </Route>

    {/* Dashboard Routes — requires authentication */}
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <LazyRoute>
          <DashboardLayout />
        </LazyRoute>
      </ProtectedRoute>
    }>
      <Route index element={<LazyRoute><DashboardHome /></LazyRoute>} />
      <Route path="accounts" element={<LazyRoute><DashboardAccounts /></LazyRoute>} />
      <Route path="billing" element={<LazyRoute><DashboardBilling /></LazyRoute>} />
      <Route path="payouts" element={<LazyRoute><DashboardPayouts /></LazyRoute>} />
      <Route path="affiliate" element={<LazyRoute><DashboardAffiliate /></LazyRoute>} />
      <Route path="profile" element={<LazyRoute><DashboardProfile /></LazyRoute>} />
      <Route path="achievements" element={<LazyRoute><DashboardAchievements /></LazyRoute>} />
      <Route path="help" element={<LazyRoute><DashboardHelp /></LazyRoute>} />
      <Route path="journal/:date" element={<LazyRoute><DashboardJournal /></LazyRoute>} />
    </Route>

    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<LazyRoute><NotFound /></LazyRoute>} />
  </Routes>
);

const App = () => {
  const { noBlur } = getPerfFlags();

  useEffect(() => {
    document.documentElement.classList.toggle("perf-no-blur", noBlur);
    return () => {
      document.documentElement.classList.remove("perf-no-blur");
    };
  }, [noBlur]);

  return (
    <HelmetProvider>
      <GoogleOAuthProvider clientId={env.googleClientId}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <AppRoutes />
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  );
};

export default App;
