import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Rules from "./pages/Rules";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Legal from "./pages/Legal";
import Login from "./pages/Login";
import Payouts from "./pages/Payouts";
import AdminPage from "./pages/admin/AdminPage";

// Admin tab imports
import { AdminOverview } from "./components/admin/tabs/AdminOverview";
import { AdminAccounts } from "./components/admin/tabs/AdminAccounts";
import { AdminRiskFlags } from "./components/admin/tabs/AdminRiskFlags";
import { AdminPayouts } from "./components/admin/tabs/AdminPayouts";
import { AdminUsersKYC } from "./components/admin/tabs/AdminUsersKYC";
import { AdminCompliance } from "./components/admin/tabs/AdminCompliance";
import { AdminBilling } from "./components/admin/tabs/AdminBilling";
import { AdminAuditLog } from "./components/admin/tabs/AdminAuditLog";
import { AdminSystemHealth } from "./components/admin/tabs/AdminSystemHealth";
import { AdminSettings } from "./components/admin/tabs/AdminSettings";
import { AdminSupport } from "./components/admin/tabs/AdminSupport";
import { AdminAnnouncements } from "./components/admin/tabs/AdminAnnouncements";
import { AdminProducts } from "./components/admin/tabs/AdminProducts";
import { AdminIntegrations } from "./components/admin/tabs/AdminIntegrations";
import { AdminSecurity } from "./components/admin/tabs/AdminSecurity";
import NotFound from "./pages/NotFound";

// Dashboard imports
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardAccounts from "./pages/dashboard/DashboardAccounts";
import DashboardBilling from "./pages/dashboard/DashboardBilling";
import DashboardPayouts from "./pages/dashboard/DashboardPayouts";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import DashboardAchievements from "./pages/dashboard/DashboardAchievements";
import DashboardHelp from "./pages/dashboard/DashboardHelp";
import DashboardAffiliate from "./pages/dashboard/DashboardAffiliate";
import DashboardJournal from "./pages/dashboard/DashboardJournal";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payouts" element={<Payouts />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminOverview />} />
            <Route path="accounts" element={<AdminAccounts />} />
            <Route path="risk" element={<AdminRiskFlags />} />
            <Route path="payouts" element={<AdminPayouts />} />
            <Route path="users" element={<AdminUsersKYC />} />
            <Route path="compliance" element={<AdminCompliance />} />
            <Route path="billing" element={<AdminBilling />} />
            <Route path="audit" element={<AdminAuditLog />} />
            <Route path="health" element={<AdminSystemHealth />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="support" element={<AdminSupport />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="integrations" element={<AdminIntegrations />} />
            <Route path="security" element={<AdminSecurity />} />
          </Route>
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="accounts" element={<DashboardAccounts />} />
            <Route path="billing" element={<DashboardBilling />} />
            <Route path="payouts" element={<DashboardPayouts />} />
            <Route path="affiliate" element={<DashboardAffiliate />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="achievements" element={<DashboardAchievements />} />
            <Route path="help" element={<DashboardHelp />} />
            <Route path="journal/:date" element={<DashboardJournal />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
