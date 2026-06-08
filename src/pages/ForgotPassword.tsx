import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/services/auth";
import { ApiError } from "@/types/api";
import ScrollReveal from "@/components/ui/ScrollReveal";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await authApi.requestPasswordReset(email);
      // Backend deliberately returns the same success shape whether the email
      // exists or not — never differentiate on the client either.
      setIsSubmitted(true);
    } catch (error) {
      if (error instanceof ApiError && error.isRateLimited) {
        toast.error("Too many requests. Please try again in a few minutes.");
      } else if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <PageMeta
        title="Forgot Password"
        description="Reset your Dynasty Futures account password. We'll email you a secure link to set a new password."
        path="/forgot-password"
        noIndex
      />
      <div className="page-transition py-12 md:py-20 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <ScrollReveal className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                <span className="text-gradient">Forgot Password</span>
              </h1>
              <p className="text-muted-foreground">
                {isSubmitted
                  ? "Check your inbox for next steps"
                  : "Enter your email and we'll send you a reset link"}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold-dark/5 rounded-full blur-2xl pointer-events-none" />

                {isSubmitted ? (
                  <div className="text-center space-y-4 py-4">
                    <div className="flex justify-center">
                      <CheckCircle2 className="w-16 h-16 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      If an account exists for{" "}
                      <span className="text-foreground font-medium">{email}</span>,
                      you'll receive a password reset link shortly. The link expires
                      in 60 minutes.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Didn't get it? Check your spam folder, or try again in a few
                      minutes.
                    </p>
                    <div className="pt-4">
                      <Link
                        to="/login"
                        className="text-primary hover:text-gold-light font-medium transition-colors text-sm"
                      >
                        Back to sign in
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="form-label-glow text-sm font-medium"
                      >
                        Email
                      </Label>
                      <div className="form-input-wrapper">
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isSubmitting}
                          className="bg-muted/30 border-border/50"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="gradient"
                      disabled={isSubmitting}
                      className="w-full btn-shimmer"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Reset Link"}
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
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
