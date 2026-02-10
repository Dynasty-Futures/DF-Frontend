import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Clock, Send, Loader2 } from 'lucide-react';
import { useCreateTicket } from '@/hooks/useSupport';
import { ApiError } from '@/types/api';

const Support = () => {
  const { toast } = useToast();
  const createTicket = useCreateTicket();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    accountId: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createTicket.mutate(
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'General Inquiry',
        description: formData.message,
        // If accountId is provided, attach it as a related entity
        ...(formData.accountId && {
          relatedEntity: 'Account',
          relatedEntityId: formData.accountId,
        }),
      },
      {
        onSuccess: () => {
          toast({
            title: 'Message Sent',
            description: "We've received your support request and will respond within 24 hours.",
          });
          setFormData({
            name: '',
            email: '',
            accountId: '',
            subject: '',
            message: '',
          });
        },
        onError: (error) => {
          const apiError = error as ApiError;
          toast({
            title: 'Failed to Submit',
            description: apiError.message || 'Something went wrong. Please try again.',
            variant: 'destructive',
          });
        },
      },
    );
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <Layout>
      <div className="page-transition py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-gradient">Support</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Need help with your account, challenge rules, or a payout request? Reach out below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        minLength={2}
                        maxLength={100}
                        className="bg-muted/30 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-muted/30 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="accountId">Account ID (Optional)</Label>
                      <Input
                        id="accountId"
                        placeholder="Your account ID"
                        value={formData.accountId}
                        onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                        className="bg-muted/30 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger className="bg-muted/30 border-border/50">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="rules">Challenge Rules</SelectItem>
                          <SelectItem value="payouts">Payouts</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you? (minimum 10 characters)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      minLength={10}
                      maxLength={5000}
                      rows={6}
                      className="bg-muted/30 border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={createTicket.isPending}
                    className="w-full bg-gradient-to-r from-primary to-teal text-primary-foreground font-semibold btn-glow"
                  >
                    {createTicket.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-gradient-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Email Us</h3>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>
                <a
                  href="mailto:support@dynastyfuturesdyn.com"
                  className="text-primary hover:underline font-medium"
                >
                  support@dynastyfuturesdyn.com
                </a>
              </div>

              <div className="bg-gradient-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Support Hours</h3>
                    <p className="text-sm text-muted-foreground">When we're available</p>
                  </div>
                </div>
                <p className="text-foreground">Monday - Friday</p>
                <p className="text-muted-foreground">9:00 AM - 6:00 PM EST</p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-teal/10 rounded-2xl border border-primary/20 p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link 
                      to="/faq" 
                      onClick={handleLinkClick}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      → Frequently Asked Questions
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/rules" 
                      onClick={handleLinkClick}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      → Trading Rules
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/pricing" 
                      onClick={handleLinkClick}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      → Pricing & Plans
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;