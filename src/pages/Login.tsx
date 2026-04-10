import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { ApiError } from "@/types/api";
import ScrollReveal from "@/components/ui/ScrollReveal";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login, googleLogin, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Where to redirect after login — check state, then query param, then default
  const from =
    (location.state as { from?: string })?.from ||
    searchParams.get("redirect") ||
    "/dashboard";

  // If already logged in, redirect
  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (idToken: string) => {
    setIsSubmitting(true);
    try {
      await googleLogin(idToken);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Google sign-in failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <PageMeta
        title="Log In"
        description="Log in to your Dynasty Futures trading dashboard to manage your evaluation accounts, track performance, and request payouts."
        path="/login"
        noIndex
      />
      <div className="page-transition py-12 md:py-20 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <ScrollReveal className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                <span className="text-gradient">Trader Login</span>
              </h1>
              <p className="text-muted-foreground">
                Access your Dynasty Futures dashboard
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold-dark/5 rounded-full blur-2xl pointer-events-none" />
                
                {/* Google SSO */}
                <GoogleSignInButton
                  onSuccess={handleGoogleSuccess}
                  text="signin_with"
                />

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      or sign in with email
                    </span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="form-label-glow text-sm font-medium">Email</Label>
                    <div className="form-input-wrapper">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        disabled={isSubmitting}
                        className="bg-muted/30 border-border/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="form-label-glow text-sm font-medium">Password</Label>
                    <div className="relative form-input-wrapper">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                        disabled={isSubmitting}
                        className="bg-muted/30 border-border/50 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="rounded border-border bg-muted/30 checkbox-glow w-4 h-4"
                      />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                    </label>
                    <a href="#" className="text-primary hover:text-gold-light transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    variant="gradient"
                    disabled={isSubmitting}
                    className="w-full btn-shimmer"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      state={{ from }}
                      className="text-primary hover:text-gold-light font-medium transition-colors"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
