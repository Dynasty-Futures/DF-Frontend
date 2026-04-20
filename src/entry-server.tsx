import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TooltipProvider } from './components/ui/tooltip';
import { env } from './config/env';

// Eagerly import all public pages for server rendering
// (React.lazy + Suspense doesn't work with renderToString)
import Index from './pages/Index';
import Pricing from './pages/Pricing';
import Rules from './pages/Rules';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import Legal from './pages/Legal';
import Login from './pages/Login';
import Register from './pages/Register';
import Payouts from './pages/Payouts';
import About from './pages/About';
import Affiliates from './pages/Affiliates';
import NotFound from './pages/NotFound';

const ServerRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/rules" element={<Rules />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/support" element={<Support />} />
    <Route path="/legal" element={<Legal />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/payouts" element={<Payouts />} />
    <Route path="/about" element={<About />} />
    <Route path="/affiliates" element={<Affiliates />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

interface RenderResult {
  html: string;
  helmet: HelmetServerState;
}

export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const queryClient = new QueryClient();

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <GoogleOAuthProvider clientId={env.googleClientId}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <StaticRouter location={url}>
                <ServerRoutes />
              </StaticRouter>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>,
  );

  return { html, helmet: helmetContext.helmet! };
}
