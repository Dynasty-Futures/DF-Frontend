import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/services/auth";
import { ApiError } from "@/types/api";
import ScrollReveal from "@/components/ui/ScrollReveal";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Missing reset token. Request a new link from the forgot-password page.");
      return;
    }

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
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await authApi.resetPassword(token, formData.password);
      toast.success("Password reset successful. Please sign in with your new password.");
      navigate("/login", { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // If we landed here without a token, surface that immediately rather than
  // letting the user fill out the form and get an error on submit.
  if (!token) {
    return (
      <Layout>
        <PageMeta title="Reset Password" path="/reset-password" noIndex />
        <div className="page-transition py-12 md:py-20 min-h-[80vh] flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                <span className="text-gradient">Invalid Link</span>
              </h1>
              <p className="text-muted-foreground mb-6">
                This password reset link is missing a token. Request a new one to continue.
              </p>
              <Link
                to="/forgot-password"
                className="text-primary hover:text-gold-light font-medium transition-colors"
              >
                Request a new link
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageMeta
        title="Reset Password"
        description="Set a new password for your Dynasty Futures account."
        path="/reset-password"
        noIndex
      />
      <div className="page-transition py-12 md:py-20 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <ScrollReveal className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                <span className="text-gradient">Reset Password</span>
              </h1>
              <p className="text-muted-foreground">
                Choose a strong new password for your account
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold-dark/5 rounded-full blur-2xl pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="form-label-glow text-sm font-medium">
                      New Password
                    </Label>
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
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      At least 8 characters with uppercase, lowercase, and a digit
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="form-label-glow text-sm font-medium"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative form-input-wrapper">
                      <Input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
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
                    <KeyRound className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </Button>

                  <div className="text-center">
                    <Link
                      to="/login"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Back to sign in
                    </Link>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
