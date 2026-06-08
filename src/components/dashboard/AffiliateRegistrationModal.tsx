import { useState } from "react";
import {
  Globe,
  Play,
  AtSign,
  Camera,
  Users,
  Send,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { affiliateService } from "@/services/affiliates";
import { ApiError } from "@/types/api";

interface FormData {
  websiteUrl: string;
  youtubeUrl: string;
  xUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  telegramUrl: string;
  discordUrl: string;
  isFundedTrader: string;
  hasActiveDynastyAccount: string;
  promotionPlan: string;
  primaryTrafficMethod: string;
  createsCustomContent: string;
  contentUpdateFrequency: string;
  preferredAffiliateCode: string;
  restrictedJurisdictionConfirmation: boolean;
}

type FieldError = Partial<Record<keyof FormData | "socialUrls", string>>;

interface AffiliateRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const INITIAL_FORM: FormData = {
  websiteUrl: "",
  youtubeUrl: "",
  xUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  telegramUrl: "",
  discordUrl: "",
  isFundedTrader: "",
  hasActiveDynastyAccount: "",
  promotionPlan: "",
  primaryTrafficMethod: "",
  createsCustomContent: "",
  contentUpdateFrequency: "",
  preferredAffiliateCode: "",
  restrictedJurisdictionConfirmation: false,
};

const inputClass =
  "w-full bg-background/50 border border-border/30 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors";

const textareaClass =
  "w-full bg-background/50 border border-border/30 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors resize-none";

const labelClass = "block text-sm font-medium text-foreground mb-1.5";
const errorClass = "text-xs text-destructive mt-1.5";

interface UrlFieldProps {
  icon: React.ElementType;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

const UrlField = ({ icon: Icon, label, placeholder, value, onChange }: UrlFieldProps) => (
  <div>
    <label className={labelClass}>
      <span className="flex items-center gap-2">
        <Icon size={13} className="text-muted-foreground flex-shrink-0" />
        {label}
      </span>
    </label>
    <input
      type="url"
      className={inputClass}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

interface YesNoGroupProps {
  value: string;
  onChange: (v: string) => void;
  yesLabel: string;
  noLabel: string;
  error?: string;
}

const YesNoGroup = ({ value, onChange, yesLabel, noLabel, error }: YesNoGroupProps) => (
  <div>
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange("yes")}
        className={cn(
          "flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200",
          value === "yes"
            ? "bg-primary/20 border-primary/50 text-primary"
            : "bg-background/30 border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
        )}
      >
        {yesLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("no")}
        className={cn(
          "flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200",
          value === "no"
            ? "bg-primary/20 border-primary/50 text-primary"
            : "bg-background/30 border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
        )}
      >
        {noLabel}
      </button>
    </div>
    {error && <p className={errorClass}>{error}</p>}
  </div>
);

const STEP_LABELS = [
  "Basic & Social Information",
  "Affiliate Background",
  "Content & Confirmation",
];

const AffiliateRegistrationModal = ({ open, onOpenChange }: AffiliateRegistrationModalProps) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldError>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const URL_FIELDS: Array<keyof FormData> = [
    "websiteUrl", "youtubeUrl", "xUrl",
    "instagramUrl", "facebookUrl", "telegramUrl", "discordUrl",
  ];

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      const next = { ...prev };
      delete next[field as keyof FieldError];
      if (URL_FIELDS.includes(field)) delete next.socialUrls;
      return next;
    });
  };

  const validateStep = (s: number): boolean => {
    const newErrors: FieldError = {};

    if (s === 1) {
      const hasSocial = URL_FIELDS.some(f => (form[f] as string).trim());
      if (!hasSocial) newErrors.socialUrls = "Please provide at least one website or social URL.";
    }

    if (s === 2) {
      if (!form.isFundedTrader) newErrors.isFundedTrader = "Please select an option.";
      if (!form.hasActiveDynastyAccount) newErrors.hasActiveDynastyAccount = "Please select an option.";
      if (!form.promotionPlan.trim()) newErrors.promotionPlan = "Please describe your promotion plan.";
      if (!form.primaryTrafficMethod.trim()) newErrors.primaryTrafficMethod = "Please describe your primary traffic method.";
    }

    if (s === 3) {
      if (!form.createsCustomContent) newErrors.createsCustomContent = "Please select an option.";
      if (!form.contentUpdateFrequency.trim()) newErrors.contentUpdateFrequency = "This field is required.";
      if (!form.preferredAffiliateCode.trim()) newErrors.preferredAffiliateCode = "Please enter a preferred affiliate code.";
      if (!form.restrictedJurisdictionConfirmation)
        newErrors.restrictedJurisdictionConfirmation = "You must confirm this statement to proceed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => s - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setIsSubmitting(true);

    // Only send URL fields that were actually filled in — the backend validates
    // each as a URL and rejects malformed values.
    const trimmedUrl = (v: string) => {
      const trimmed = v.trim();
      return trimmed ? trimmed : undefined;
    };

    try {
      await affiliateService.apply({
        websiteUrl: trimmedUrl(form.websiteUrl),
        youtubeUrl: trimmedUrl(form.youtubeUrl),
        xUrl: trimmedUrl(form.xUrl),
        instagramUrl: trimmedUrl(form.instagramUrl),
        facebookUrl: trimmedUrl(form.facebookUrl),
        telegramUrl: trimmedUrl(form.telegramUrl),
        discordUrl: trimmedUrl(form.discordUrl),
        isFundedTrader: form.isFundedTrader === "yes",
        hasActiveDynastyAccount: form.hasActiveDynastyAccount === "yes",
        promotionPlan: form.promotionPlan,
        primaryTrafficMethod: form.primaryTrafficMethod,
        createsCustomContent: form.createsCustomContent === "yes",
        contentUpdateFrequency: form.contentUpdateFrequency,
        preferredAffiliateCode: form.preferredAffiliateCode,
        restrictedJurisdictionConfirmation: form.restrictedJurisdictionConfirmation,
      });

      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Something went wrong submitting your application. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setStep(1);
      setForm(INITIAL_FORM);
      setErrors({});
      setSubmitted(false);
      setIsSubmitting(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "max-w-2xl p-0 gap-0 overflow-hidden flex flex-col bg-card border-border/50",
          submitted ? "max-h-fit" : "max-h-[92vh]"
        )}
      >
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-14 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 border border-primary/20">
              <CheckCircle2 size={32} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-3">Application Submitted</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Your affiliate application has been submitted for review. Our team will review your
              information and contact you if additional details are needed.
            </p>
            <Button
              className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              onClick={() => handleClose(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between pl-6 pr-14 pt-6 pb-4 border-b border-border/20 flex-shrink-0">
              <div className="min-w-0">
                <DialogTitle className="text-xl font-bold text-foreground">
                  Affiliate Registration
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Step {step} of 3 — {STEP_LABELS[step - 1]}
                </p>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 flex-shrink-0">
                {[1, 2, 3].map(n => (
                  <div
                    key={n}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      n < step ? "w-8 bg-primary" : n === step ? "w-10 bg-primary" : "w-5 bg-border/40"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground mb-2">
                    Please provide the URLs for your platforms. At least one is required.
                  </p>
                  <UrlField
                    icon={Globe}
                    label="Website URL"
                    placeholder="https://yourwebsite.com"
                    value={form.websiteUrl}
                    onChange={v => updateField("websiteUrl", v)}
                  />
                  <UrlField
                    icon={Play}
                    label="YouTube URL"
                    placeholder="https://youtube.com/@yourchannel"
                    value={form.youtubeUrl}
                    onChange={v => updateField("youtubeUrl", v)}
                  />
                  <UrlField
                    icon={AtSign}
                    label="X (Twitter) URL"
                    placeholder="https://x.com/yourhandle"
                    value={form.xUrl}
                    onChange={v => updateField("xUrl", v)}
                  />
                  <UrlField
                    icon={Camera}
                    label="Instagram URL"
                    placeholder="https://instagram.com/yourprofile"
                    value={form.instagramUrl}
                    onChange={v => updateField("instagramUrl", v)}
                  />
                  <UrlField
                    icon={Users}
                    label="Facebook URL"
                    placeholder="https://facebook.com/yourpage"
                    value={form.facebookUrl}
                    onChange={v => updateField("facebookUrl", v)}
                  />
                  <UrlField
                    icon={Send}
                    label="Telegram URL"
                    placeholder="https://t.me/yourchannel"
                    value={form.telegramUrl}
                    onChange={v => updateField("telegramUrl", v)}
                  />
                  <UrlField
                    icon={MessageSquare}
                    label="Discord URL"
                    placeholder="https://discord.gg/yourserver"
                    value={form.discordUrl}
                    onChange={v => updateField("discordUrl", v)}
                  />
                  {errors.socialUrls && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-2.5">
                      <p className="text-sm text-destructive">{errors.socialUrls}</p>
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Are you a funded trader yourself?</label>
                    <YesNoGroup
                      value={form.isFundedTrader}
                      onChange={v => updateField("isFundedTrader", v)}
                      yesLabel="Yes, I am"
                      noLabel="No, I am not"
                      error={errors.isFundedTrader}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Do you have an active trading account with us?</label>
                    <YesNoGroup
                      value={form.hasActiveDynastyAccount}
                      onChange={v => updateField("hasActiveDynastyAccount", v)}
                      yesLabel="Yes, I do"
                      noLabel="No, I don't"
                      error={errors.hasActiveDynastyAccount}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      How are you planning to promote our Affiliate Program?
                    </label>
                    <textarea
                      className={textareaClass}
                      rows={4}
                      placeholder="Describe your promotion strategy..."
                      value={form.promotionPlan}
                      onChange={e => updateField("promotionPlan", e.target.value)}
                    />
                    {errors.promotionPlan && <p className={errorClass}>{errors.promotionPlan}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>
                      What is your primary method of driving traffic to your affiliate links?
                    </label>
                    <textarea
                      className={textareaClass}
                      rows={4}
                      placeholder="e.g. YouTube videos, blog posts, social media posts..."
                      value={form.primaryTrafficMethod}
                      onChange={e => updateField("primaryTrafficMethod", e.target.value)}
                    />
                    {errors.primaryTrafficMethod && (
                      <p className={errorClass}>{errors.primaryTrafficMethod}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>
                      Are you going to create custom content or features on your website to promote our products?
                    </label>
                    <YesNoGroup
                      value={form.createsCustomContent}
                      onChange={v => updateField("createsCustomContent", v)}
                      yesLabel="Yes"
                      noLabel="No"
                      error={errors.createsCustomContent}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      How often do you update your content on your platforms? And in which one do you generate more traffic?
                    </label>
                    <textarea
                      className={textareaClass}
                      rows={4}
                      placeholder="Describe your content update frequency and top-performing platform..."
                      value={form.contentUpdateFrequency}
                      onChange={e => updateField("contentUpdateFrequency", e.target.value)}
                    />
                    {errors.contentUpdateFrequency && (
                      <p className={errorClass}>{errors.contentUpdateFrequency}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Affiliate Code</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="e.g. YOURNAME15"
                      value={form.preferredAffiliateCode}
                      onChange={e =>
                        updateField("preferredAffiliateCode", e.target.value.toUpperCase())
                      }
                    />
                    {errors.preferredAffiliateCode && (
                      <p className={errorClass}>{errors.preferredAffiliateCode}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className={cn(
                        "flex items-start gap-3 cursor-pointer group",
                        errors.restrictedJurisdictionConfirmation && "text-destructive"
                      )}
                    >
                      <div className="relative mt-0.5 flex-shrink-0">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={form.restrictedJurisdictionConfirmation}
                          onChange={e =>
                            updateField("restrictedJurisdictionConfirmation", e.target.checked)
                          }
                        />
                        <div
                          className={cn(
                            "w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center",
                            form.restrictedJurisdictionConfirmation
                              ? "bg-primary border-primary"
                              : "bg-background/50 border-border/50 group-hover:border-border"
                          )}
                        >
                          {form.restrictedJurisdictionConfirmation && (
                            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                              <path
                                d="M2 6l3 3 5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary-foreground"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors select-none">
                        I confirm that all my information is accurate and truthful, and I am not
                        residing in any restricted or sanctioned jurisdiction.
                      </span>
                    </label>
                    {errors.restrictedJurisdictionConfirmation && (
                      <p className={cn(errorClass, "mt-2")}>
                        {errors.restrictedJurisdictionConfirmation}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border/20 flex-shrink-0 bg-card/50">
              <Button
                variant="ghost"
                className={cn(
                  "text-muted-foreground hover:text-foreground transition-all duration-200",
                  step === 1 ? "invisible" : "visible"
                )}
                onClick={handleBack}
              >
                ← Back
              </Button>
              {step < 3 ? (
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleNext}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AffiliateRegistrationModal;
