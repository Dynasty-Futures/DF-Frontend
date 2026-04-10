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
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { ApiError } from "@/types/api";
import ScrollReveal from "@/components/ui/ScrollReveal";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { register, googleLogin, isAuthenticated } = useAuth();

  // Where to redirect after registration — check state, then query param, then default
  const redirectTo =
    (location.state as { from?: string })?.from ||
    searchParams.get("redirect") ||
    "/dashboard";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // If already logged in, redirect
  if (isAuthenticated) {
    navigate(redirectTo, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      toast.success("Account created successfully!");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (idToken: string) => {
    setIsSubmitting(true);
    try {
      await googleLogin(idToken);
      toast.success("Welcome to Dynasty Futures!");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Google sign-up failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <PageMeta
        title="Create Account"
        description="Register for a Dynasty Futures account to start your funded futures trading evaluation. Sign up with email or Google."
        path="/register"
        noIndex
      />
      <div className="page-transition py-12 md:py-20 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <ScrollReveal className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                <span className="text-gradient">Create Account</span>
              </h1>
              <p className="text-muted-foreground">
                Join Dynasty Futures and start your trading journey
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 relative overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold-dark/5 rounded-full blur-2xl pointer-events-none" />
                
                {/* Google SSO */}
                <GoogleSignInButton
                  onSuccess={handleGoogleSuccess}
                  text="signup_with"
                />

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      or register with email
                    </span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="form-label-glow text-sm font-medium">First Name</Label>
                      <div className="form-input-wrapper">
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          required
                          disabled={isSubmitting}
                          className="bg-muted/30 border-border/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="form-label-glow text-sm font-medium">Last Name</Label>
                      <div className="form-input-wrapper">
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          required
                          disabled={isSubmitting}
                          className="bg-muted/30 border-border/50"
                        />
                      </div>
                    </div>
                  </div>

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
                    <p className="text-xs text-muted-foreground">
                      At least 8 characters with uppercase, lowercase, and a
                      digit
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="form-label-glow text-sm font-medium">Confirm Password</Label>
                    <div className="relative form-input-wrapper">
                      <Input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                        disabled={isSubmitting}
                        className="bg-muted/30 border-border/50 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    variant="gradient"
                    disabled={isSubmitting}
                    className="w-full btn-shimmer"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      state={{ from: redirectTo }}
                      className="text-primary hover:text-gold-light font-medium transition-colors"
                    >
                      Sign In
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

export default Register;
