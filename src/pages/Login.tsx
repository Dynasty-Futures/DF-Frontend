import { useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { ApiError } from '@/types/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login, googleLogin, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Where to redirect after login — check state, then query param, then default
  const from =
    (location.state as { from?: string })?.from ||
    searchParams.get('redirect') ||
    '/dashboard';

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
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (idToken: string) => {
    setIsSubmitting(true);
    try {
      await googleLogin(idToken);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Google sign-in failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="page-transition py-12 md:py-20 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                <span className="text-gradient">Trader Login</span>
              </h1>
              <p className="text-muted-foreground">
                Access your Dynasty Futures dashboard
              </p>
            </div>

            <div className="bg-gradient-card rounded-3xl border border-border/50 p-8">
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="bg-muted/30 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="bg-muted/30 border-border/50 focus:border-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border bg-muted/30" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-teal text-primary-foreground font-semibold btn-glow"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" state={{ from }} className="text-primary hover:underline">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
