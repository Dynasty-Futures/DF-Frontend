import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  AlertCircle,
  Globe,
  FileText,
  Lock,
  Settings,
  Bell,
  Eye,
  EyeOff,
  Upload,
  Download,
  Calendar,
  Smartphone,
  Copy,
  Key,
  Loader2,
  Edit3,
  Plus,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiClient } from "@/services/api";
import { ApiError } from "@/types/api";
import type { User as UserType } from "@/types/user";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useUserPlatformProfile } from "@/hooks/useUsers";

// KYC is completed in the YPF-hosted trading portal (it owns identity
// verification); we surface status here and hand off to complete/resubmit.
const KYC_PORTAL_URL = "https://admin.dynastyfuturesdyn.com";

const DashboardProfile = () => {
  const { user, refreshUser } = useAuth();

  // Personal info form state
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "", // TODO: backend - not yet on User model
    email: "",
    phone: "",
    country: "",
    city: "", // TODO: backend - not yet on User model
    timezone: "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Address form state — TODO: backend - load from user address endpoint
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 2FA state (preserved for Security tab re-enablement)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  // Notification preferences (preserved for Settings tab re-enablement)
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [payoutNotifications, setPayoutNotifications] = useState(true);
  const [ruleViolationAlerts, setRuleViolationAlerts] = useState(true);

  const { toast } = useToast();

  // Mock backup codes (preserved for Security tab)
  const backupCodes = [
    "A7K2-M9X4",
    "B3P8-N5R2",
    "C6L1-Q8T7",
    "D4W9-S2Y6",
    "E8J5-U1V3",
    "F2H7-X4Z9",
  ];

  // Sync form when user loads or changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        dateOfBirth: "", // TODO: backend - populate when field is available
        email: user.email ?? "",
        phone: user.phone ?? "",
        country: "", // TODO: backend - not yet on User model
        city: "", // TODO: backend - not yet on User model
        timezone: "", // TODO: backend - not yet on User model
      });
    }
  }, [user]);

  // KYC progress derived from user data
  const kycSteps = [
    { label: "Email Verified", done: user?.emailVerified ?? false },
    { label: "Phone Verified", done: false },
    { label: "ID Verification", done: user?.kycStatus === "APPROVED" },
  ];
  const kycCompleted = kycSteps.filter((s) => s.done).length;
  const kycProgress = Math.round((kycCompleted / kycSteps.length) * 100);

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSavingProfile(true);
    try {
      await apiClient.patch<{ success: true; data: UserType }>(
        `/users/${user.id}`,
        {
          firstName: profileForm.firstName.trim(),
          lastName: profileForm.lastName.trim(),
          phone: profileForm.phone.trim() || null,
          // TODO: backend - add dateOfBirth, city, country, timezone when supported
        },
      );
      await refreshUser();
      toast({
        title: "Profile updated",
        description: "Your personal information has been saved.",
      });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Failed to save profile. Please try again.";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setIsSavingProfile(false);
    }
  };

  // TODO: backend - connect to password change endpoint
  const handleUpdatePassword = async () => {
    toast({
      title: "Not yet available",
      description: "Password change will be connected to the backend soon.",
      variant: "destructive",
    });
  };

  // TODO: backend - save address to user profile endpoint
  const handleSaveAddress = () => {
    setIsEditingAddress(false);
    toast({
      title: "Address saved",
      description: "Address will sync once the backend endpoint is connected.",
    });
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    toast({ title: "Copied!", description: "Backup codes copied to clipboard" });
  };

  const displayName =
    user?.firstName || user?.lastName
      ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
      : "Trader";

  return (
    <div className="space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal information and account details
          </p>
        </div>
      </ScrollReveal>

      {/* Tabs — only Account Details and KYC are visible in the nav */}
      <ScrollReveal delay={150}>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-card/50 border border-border/30 p-1 rounded-xl">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg px-4 py-2 text-sm"
            >
              <User size={16} className="mr-2 hidden sm:inline" />
              Account Details
            </TabsTrigger>
            <TabsTrigger
              value="verification"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg px-4 py-2 text-sm"
            >
              <Shield size={16} className="mr-2 hidden sm:inline" />
              <span className="hidden md:inline">Verification / KYC</span>
              <span className="md:hidden">KYC</span>
            </TabsTrigger>
          </TabsList>

          {/* ─────────────────────────────────────────
              Account Details Tab
          ───────────────────────────────────────── */}
          <TabsContent value="personal" className="mt-8 space-y-8">

            {/* A. Profile Header Card */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/30 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center flex-shrink-0">
                <User size={36} className="text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-foreground">{displayName}</h2>
                <p className="text-muted-foreground text-sm mt-1">{user?.email}</p>
                <span
                  className={`inline-flex items-center gap-1.5 mt-2 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    user?.kycStatus === "APPROVED"
                      ? "bg-primary/20 text-primary"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {user?.kycStatus === "APPROVED" ? (
                    <CheckCircle size={11} />
                  ) : (
                    <AlertCircle size={11} />
                  )}
                  {user?.kycStatus === "APPROVED" ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>

            {/* B. Personal Information */}
            <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-muted-foreground text-sm">First Name</Label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="firstName"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                      disabled={isSavingProfile}
                      className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-muted-foreground text-sm">Last Name</Label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="lastName"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                      disabled={isSavingProfile}
                      className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-muted-foreground text-sm">Date of Birth</Label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileForm.dateOfBirth}
                      onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
                      disabled={isSavingProfile}
                      className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-muted-foreground text-sm">Email Address</Label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      readOnly
                      disabled
                      className="pl-10 h-11 bg-muted/20 border-border/30 rounded-xl opacity-60 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-muted-foreground text-sm">Phone Number</Label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="Enter phone number"
                      disabled={isSavingProfile}
                      className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-muted-foreground text-sm">Country</Label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="country"
                      value={profileForm.country}
                      onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                      placeholder="Enter country"
                      disabled={isSavingProfile}
                      className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-muted-foreground text-sm">City</Label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="city"
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      placeholder="Enter city"
                      disabled={isSavingProfile}
                      className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-muted-foreground text-sm">Timezone</Label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="timezone"
                      value={profileForm.timezone}
                      onChange={(e) => setProfileForm({ ...profileForm, timezone: e.target.value })}
                      placeholder="e.g. America/New_York"
                      disabled={isSavingProfile}
                      className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <Button
                className="mt-8 btn-gradient-animated text-primary-foreground px-8 h-11 text-base"
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
              >
                {isSavingProfile && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isSavingProfile ? "Saving..." : "Save Changes"}
              </Button>
            </div>

            {/* C. Address Details */}
            <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h3 className="text-lg font-semibold text-foreground">Address Details</h3>
                </div>
                {!isEditingAddress && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-border/40 hover:border-primary/50"
                    onClick={() => setIsEditingAddress(true)}
                  >
                    <Edit3 size={14} />
                    Edit
                  </Button>
                )}
              </div>

              {!isEditingAddress ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", value: addressForm.fullName },
                    { label: "Email", value: addressForm.email },
                    { label: "Phone Number", value: addressForm.phone },
                    { label: "Street Address", value: addressForm.streetAddress },
                    { label: "City", value: addressForm.city },
                    { label: "State / Region", value: addressForm.state },
                    { label: "Postal Code", value: addressForm.postalCode },
                    { label: "Country", value: addressForm.country },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="p-4 rounded-xl bg-muted/10 border border-border/20"
                    >
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                      <p className="text-sm text-foreground mt-1">{value || "—"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">Full Name</Label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={addressForm.fullName}
                          onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                          placeholder="Full name"
                          className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">Email</Label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="email"
                          value={addressForm.email}
                          onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                          placeholder="Email address"
                          className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">Phone Number</Label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="tel"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          placeholder="Phone number"
                          className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 sm:col-span-1">
                      <Label className="text-muted-foreground text-sm">Street Address</Label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={addressForm.streetAddress}
                          onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })}
                          placeholder="123 Main St"
                          className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">City</Label>
                      <Input
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        placeholder="City"
                        className="h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">State / Region</Label>
                      <Input
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        placeholder="State or region"
                        className="h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">Postal Code</Label>
                      <Input
                        value={addressForm.postalCode}
                        onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                        placeholder="Postal code"
                        className="h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">Country</Label>
                      <div className="relative">
                        <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={addressForm.country}
                          onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                          placeholder="Country"
                          className="pl-10 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="btn-gradient-animated text-primary-foreground px-6 h-11"
                      onClick={handleSaveAddress}
                    >
                      Save Address
                    </Button>
                    <Button
                      variant="outline"
                      className="px-6 h-11 border-border/40"
                      onClick={() => setIsEditingAddress(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {!isEditingAddress && (
                <button
                  className="mt-6 w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-border/40 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  onClick={() => {
                    // TODO: backend - support multiple saved addresses
                    toast({
                      title: "Coming soon",
                      description: "Multiple addresses will be supported soon.",
                    });
                  }}
                >
                  <Plus size={16} />
                  <span className="text-sm font-medium">Add New Address</span>
                </button>
              )}
            </div>

            {/* D. Password */}
            <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Lock size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Password</h3>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-muted-foreground text-sm">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                      className="pl-10 pr-12 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-muted-foreground text-sm">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      className="pl-10 pr-12 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-muted-foreground text-sm">
                    Re-enter New Password
                  </Label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      className="pl-10 pr-12 h-11 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                className="mt-8 btn-gradient-animated text-primary-foreground px-8 h-11 text-base"
                onClick={handleUpdatePassword}
                disabled={isSavingPassword}
              >
                {isSavingPassword && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Update Password
              </Button>
            </div>

          </TabsContent>

          {/* ─────────────────────────────────────────
              KYC Tab (unchanged)
          ───────────────────────────────────────── */}
          <TabsContent value="verification" className="mt-8">
            <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <Shield size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">KYC Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    {kycCompleted} of {kycSteps.length} Complete
                  </p>
                </div>
              </div>

              {(() => {
                const status = user?.kycStatus ?? "NOT_STARTED";
                const cfg = {
                  APPROVED: {
                    cls: "bg-primary/10 border-primary/20 text-primary",
                    icon: <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />,
                    msg: "Your identity is verified — you're all set for payouts.",
                  },
                  PENDING: {
                    cls: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
                    icon: <Loader2 size={18} className="text-yellow-500 shrink-0 mt-0.5 animate-spin" />,
                    msg: "Your documents are under review. This page updates once verification completes.",
                  },
                  REJECTED: {
                    cls: "bg-destructive/10 border-destructive/20 text-destructive",
                    icon: <AlertCircle size={18} className="text-destructive shrink-0 mt-0.5" />,
                    msg: "Verification wasn't approved. Please resubmit your documents in the trading portal.",
                  },
                  NOT_STARTED: {
                    cls: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
                    icon: <AlertCircle size={18} className="text-yellow-500 shrink-0 mt-0.5" />,
                    msg: "Verification is required before payouts can be processed.",
                  },
                }[status];
                return (
                  <div className={`p-4 rounded-xl border mb-8 flex items-start gap-3 ${cfg.cls}`}>
                    {cfg.icon}
                    <p className="text-sm">{cfg.msg}</p>
                  </div>
                );
              })()}

              <div className="mb-8">
                <Progress value={kycProgress} className="h-2 bg-muted/30" />
              </div>

              <div className="space-y-4">
                {kycSteps.map((step) => (
                  <div
                    key={step.label}
                    className={`flex items-center justify-between p-5 rounded-xl border ${
                      step.done
                        ? "bg-primary/5 border-primary/20"
                        : "bg-yellow-500/5 border-yellow-500/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${step.done ? "bg-primary/20" : "bg-yellow-500/20"}`}>
                        {step.done ? (
                          <CheckCircle size={20} className="text-primary" />
                        ) : (
                          <AlertCircle size={20} className="text-yellow-500" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-foreground">{step.label}</span>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        step.done
                          ? "text-primary bg-primary/20"
                          : "text-yellow-500 bg-yellow-500/20"
                      }`}
                    >
                      {step.done ? "Complete" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                KYC status:{" "}
                <span className="font-medium text-foreground">
                  {user?.kycStatus ?? "NOT_STARTED"}
                </span>
              </p>

              {user?.kycStatus !== "APPROVED" && user?.kycStatus !== "PENDING" && (
                <Button
                  asChild
                  className="w-full mt-4 btn-gradient-animated text-primary-foreground py-6 text-base"
                >
                  <a href={KYC_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                    {user?.kycStatus === "REJECTED"
                      ? "Resubmit Verification"
                      : "Start Verification"}
                  </a>
                </Button>
              )}
            </div>
          </TabsContent>

          {/* ─────────────────────────────────────────
              Hidden tabs — kept for re-enablement.
              Add a TabsTrigger above to restore them.
          ───────────────────────────────────────── */}

          {/* Tax Forms (hidden) */}
          <TabsContent value="tax" className="mt-8">
            <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <FileText size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Tax Forms</h3>
                  <p className="text-sm text-muted-foreground">Manage your tax documentation</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-8">
                <p className="text-sm text-yellow-500">
                  Tax forms are required before payouts can be released.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-muted/20 border border-border/30">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Form Status</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <AlertCircle size={18} className="text-yellow-500" />
                      <span className="text-foreground font-medium">Not Submitted</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-xl bg-muted/20 border border-border/30">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Required Form</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <FileText size={18} className="text-primary" />
                      <span className="text-foreground font-medium">W-9 (US Residents)</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-muted/20 border border-border/30">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-4 block">
                    Upload Tax Form
                  </Label>
                  <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload size={32} className="text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your tax form here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      Accepted formats: PDF, JPG, PNG (Max 10MB)
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-muted/10 border border-border/20 opacity-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                        Submitted Form
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">No form submitted yet</p>
                    </div>
                    <Button variant="outline" disabled className="gap-2">
                      <Download size={16} />
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="mt-8 btn-gradient-animated text-primary-foreground px-8 py-6 text-base">
                <Upload size={18} className="mr-2" />
                Upload Tax Form
              </Button>
            </div>
          </TabsContent>

          {/* Security (hidden) */}
          <TabsContent value="security" className="mt-8">
            <div className="space-y-8">
              {/* 2FA */}
              <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                    <Smartphone size={28} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                </div>

                {twoFactorEnabled ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-muted/20 border border-border/30">
                        <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-4 block">
                          Scan QR Code
                        </Label>
                        <div className="bg-white p-4 rounded-xl w-fit mx-auto">
                          <div className="w-32 h-32 bg-gradient-to-br from-foreground/80 to-foreground flex items-center justify-center rounded">
                            <div className="grid grid-cols-5 gap-1 p-2">
                              {Array.from({ length: 25 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-4 h-4 ${Math.random() > 0.5 ? "bg-white" : "bg-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center mt-4">
                          Scan with Google Authenticator or Authy
                        </p>
                      </div>

                      <div className="p-6 rounded-xl bg-muted/20 border border-border/30">
                        <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-4 block">
                          Or Enter Code Manually
                        </Label>
                        <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                          <code className="text-sm text-primary font-mono break-all">JBSWY3DPEHPK3PXP</code>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 gap-2"
                          onClick={() => {
                            navigator.clipboard.writeText("JBSWY3DPEHPK3PXP");
                            toast({ title: "Copied!", description: "Secret key copied to clipboard" });
                          }}
                        >
                          <Copy size={14} />
                          Copy Secret Key
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="verifyCode" className="text-muted-foreground text-sm">
                        Enter Verification Code
                      </Label>
                      <div className="relative max-w-xs">
                        <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="verifyCode"
                          placeholder="000000"
                          maxLength={6}
                          className="pl-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base font-mono tracking-widest"
                        />
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Key size={20} className="text-yellow-500" />
                          <div>
                            <h4 className="text-sm font-semibold text-foreground">Backup Codes</h4>
                            <p className="text-xs text-muted-foreground">Save these codes in a secure location</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowBackupCodes(!showBackupCodes)}
                        >
                          {showBackupCodes ? "Hide" : "Show"} Codes
                        </Button>
                      </div>

                      {showBackupCodes && (
                        <div className="mt-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                            {backupCodes.map((code, index) => (
                              <div
                                key={index}
                                className="p-2 rounded-lg bg-muted/30 border border-border/30 text-center"
                              >
                                <code className="text-sm font-mono text-foreground">{code}</code>
                              </div>
                            ))}
                          </div>
                          <Button variant="outline" size="sm" className="gap-2" onClick={copyBackupCodes}>
                            <Copy size={14} />
                            Copy All Codes
                          </Button>
                        </div>
                      )}
                    </div>

                    <Button className="btn-gradient-animated text-primary-foreground px-8 py-6 text-base">
                      Verify & Enable 2FA
                    </Button>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-muted/10 border border-border/20">
                    <p className="text-sm text-muted-foreground">
                      Two-factor authentication adds an extra layer of security by requiring a code from
                      your phone in addition to your password when signing in.
                    </p>
                  </div>
                )}
              </div>

              {/* Change Password (preserved in Security tab) */}
              <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                    <Lock size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/20 border border-border/30 mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Last password change</p>
                      <p className="text-sm text-foreground font-medium">December 1, 2024</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="secCurrentPassword" className="text-muted-foreground text-sm">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="secCurrentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        className="pl-12 pr-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="secNewPassword" className="text-muted-foreground text-sm">
                      New Password
                    </Label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="secNewPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="pl-12 pr-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="secConfirmPassword" className="text-muted-foreground text-sm">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="secConfirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="pl-12 pr-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button className="mt-8 btn-gradient-animated text-primary-foreground px-8 py-6 text-base">
                  Update Password
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Settings (hidden) */}
          <TabsContent value="settings" className="mt-8">
            <div className="space-y-8">
              <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                    <Bell size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground">Control how you receive notifications</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 rounded-xl bg-muted/20 border border-border/30">
                    <div className="flex items-center gap-4">
                      <Mail size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Email Notifications</p>
                        <p className="text-xs text-muted-foreground">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-xl bg-muted/20 border border-border/30">
                    <div className="flex items-center gap-4">
                      <FileText size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Payout Notifications</p>
                        <p className="text-xs text-muted-foreground">Get notified about payout status</p>
                      </div>
                    </div>
                    <Switch checked={payoutNotifications} onCheckedChange={setPayoutNotifications} />
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-xl bg-muted/20 border border-border/30">
                    <div className="flex items-center gap-4">
                      <AlertCircle size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Rule Violation Alerts</p>
                        <p className="text-xs text-muted-foreground">Immediate alerts for rule breaches</p>
                      </div>
                    </div>
                    <Switch checked={ruleViolationAlerts} onCheckedChange={setRuleViolationAlerts} />
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h3 className="text-lg font-semibold text-foreground">Session & Display Settings</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="defaultTimezone" className="text-muted-foreground text-sm">
                      Default Timezone
                    </Label>
                    <div className="relative">
                      <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="defaultTimezone"
                        defaultValue="America/New_York (EST)"
                        className="pl-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="dateFormat" className="text-muted-foreground text-sm">
                      Date Format
                    </Label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="dateFormat"
                        defaultValue="MM/DD/YYYY"
                        className="pl-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h3 className="text-lg font-semibold text-foreground">Account Preferences</h3>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="payoutMethod" className="text-muted-foreground text-sm">
                    Default Payout Method
                  </Label>
                  <div className="relative">
                    <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="payoutMethod"
                      defaultValue="Bank Transfer (ACH)"
                      className="pl-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base"
                    />
                  </div>
                </div>

                <Button className="mt-8 btn-gradient-animated text-primary-foreground px-8 py-6 text-base">
                  Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Trading Platform (hidden) */}
          <TabsContent value="platform" className="mt-8">
            <PlatformPanel userId={user?.id} />
          </TabsContent>
        </Tabs>
      </ScrollReveal>
    </div>
  );
};

// =============================================================================
// PlatformPanel — Trading Platform (Volumetrica) profile panel
// =============================================================================

const PlatformPanel = ({ userId }: { userId: string | undefined }) => {
  const { data, isLoading, isError, error } = useUserPlatformProfile(userId);
  const profile = data?.data;
  const notProvisioned =
    isError && error instanceof ApiError && error.statusCode === 400;

  return (
    <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
          <Server size={28} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Trading Platform</h3>
          <p className="text-sm text-muted-foreground">Your Volumetrica account linkage status</p>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 size={14} className="animate-spin" /> Loading platform profile…
        </div>
      )}

      {notProvisioned && (
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-sm text-yellow-500">
            Your account isn't linked to the trading platform yet. This usually happens automatically
            after your first challenge purchase. Reach out to support if it doesn't appear within a
            few minutes.
          </p>
        </div>
      )}

      {isError && !notProvisioned && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
          {error?.message ?? "Failed to load platform profile."}
        </div>
      )}

      {profile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PlatformField label="Platform User ID" value={profile.platformUserId} mono />
          <PlatformField label="Username" value={profile.userName} />
          <PlatformField label="Email" value={profile.email} />
          <PlatformField label="Country" value={profile.country} />
          <PlatformField label="City" value={profile.city} />
          <PlatformField label="State" value={profile.state} />
          <PlatformField
            label="Web Access"
            value={
              profile.webAccessDisabled === undefined
                ? undefined
                : profile.webAccessDisabled
                  ? "Disabled"
                  : "Enabled"
            }
          />
          <PlatformField label="External ID" value={profile.extEntityId} mono />
          <PlatformField
            label="Created"
            value={profile.createdAt ? new Date(profile.createdAt).toLocaleString() : undefined}
          />
          <PlatformField
            label="Last Updated"
            value={profile.updatedAt ? new Date(profile.updatedAt).toLocaleString() : undefined}
          />
        </div>
      )}
    </div>
  );
};

const PlatformField = ({
  label,
  value,
  mono,
}: {
  label: string;
  value?: string;
  mono?: boolean;
}) => (
  <div className="p-4 rounded-xl bg-muted/10 border border-border/20">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={`text-sm text-foreground mt-1 break-all ${mono ? "font-mono" : ""}`}>
      {value ?? "—"}
    </p>
  </div>
);

export default DashboardProfile;
