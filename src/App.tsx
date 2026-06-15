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
import { getPerfFlags } from "@/lib/perfFlags";
import CookieConsentBanner from "@/components/ui/CookieConsentBanner";
import CrispChat from "@/components/integrations/CrispChat";

// Keep home route eagerly loaded; lazy-load the rest.
import Index from "./pages/Index";
const Pricing = lazy(() => import("./pages/Pricing"));
const Rules = lazy(() => import("./pages/Rules"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Support = lazy(() => import("./pages/Support"));
const Legal = lazy(() => import("./pages/Legal"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const About = lazy(() => import("./pages/About"));
const Payouts = lazy(() => import("./pages/Payouts"));
const Affiliates = lazy(() => import("./pages/Affiliates"));
const NotFound = lazy(() => import("./pages/NotFound"));

const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const DashboardAccounts = lazy(() => import("./pages/dashboard/DashboardAccounts"));
const DashboardBilling = lazy(() => import("./pages/dashboard/DashboardBilling"));
const DashboardPayouts = lazy(() => import("./pages/dashboard/DashboardPayouts"));
const DashboardProfile = lazy(() => import("./pages/dashboard/DashboardProfile"));
const DashboardAchievements = lazy(() => import("./pages/dashboard/DashboardAchievements"));
const DashboardAwards = lazy(() => import("./pages/dashboard/DashboardAwards"));
const DashboardHelp = lazy(() => import("./pages/dashboard/DashboardHelp"));
const DashboardAffiliate = lazy(() => import("./pages/dashboard/DashboardAffiliate"));
const DashboardJournal = lazy(() => import("./pages/dashboard/DashboardJournal"));
const DashboardTrade = lazy(() => import("./pages/dashboard/DashboardTrade"));

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
    <Route path="/forgot-password" element={<LazyRoute><ForgotPassword /></LazyRoute>} />
    <Route path="/reset-password" element={<LazyRoute><ResetPassword /></LazyRoute>} />
    <Route path="/about" element={<LazyRoute><About /></LazyRoute>} />
    <Route path="/payouts" element={<LazyRoute><Payouts /></LazyRoute>} />
    <Route path="/affiliates" element={<LazyRoute><Affiliates /></LazyRoute>} />

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
      <Route path="awards" element={<LazyRoute><DashboardAwards /></LazyRoute>} />
      <Route path="help" element={<LazyRoute><DashboardHelp /></LazyRoute>} />
      <Route path="journal/:date" element={<LazyRoute><DashboardJournal /></LazyRoute>} />
      <Route path="trade" element={<LazyRoute><DashboardTrade /></LazyRoute>} />
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
              <CrispChat />
              <BrowserRouter>
                <ScrollToTop />
                <AppRoutes />
                <CookieConsentBanner />
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  );
};

export default App;
