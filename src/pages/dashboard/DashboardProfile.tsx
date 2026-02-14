import { User, Mail, Phone, MapPin, Shield, CheckCircle, AlertCircle, Globe, FileText, Lock, Settings, Bell, Eye, EyeOff, Upload, Download, Calendar, Smartphone, Copy, Key, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/services/api';
import { ApiError } from '@/types/api';
import type { User as UserType } from '@/types/user';

const DashboardProfile = () => {
  const { user, refreshUser } = useAuth();

  // Personal info form state — initialized from the authenticated user
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    timezone: '',
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Sync form state when the user object loads or changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        country: '',    // not stored on User model yet
        timezone: '',   // not stored on User model yet
      });
    }
  }, [user]);

  // KYC progress derived from user data
  const kycSteps = [
    { label: 'Email Verified', done: user?.emailVerified ?? false },
    // Phone and ID verification are not tracked on User yet — keep as placeholders
    { label: 'Phone Verified', done: false },
    { label: 'ID Verification', done: user?.kycStatus === 'APPROVED' },
  ];
  const kycCompleted = kycSteps.filter((s) => s.done).length;
  const kycProgress = Math.round((kycCompleted / kycSteps.length) * 100);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const { toast } = useToast();
  
  // Notification preferences state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [payoutNotifications, setPayoutNotifications] = useState(true);
  const [ruleViolationAlerts, setRuleViolationAlerts] = useState(true);

  // Mock backup codes
  const backupCodes = ['A7K2-M9X4', 'B3P8-N5R2', 'C6L1-Q8T7', 'D4W9-S2Y6', 'E8J5-U1V3', 'F2H7-X4Z9'];

  // Save personal info
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
        }
      );

      // Refresh the user in AuthContext so the navbar etc. updates
      await refreshUser();

      toast({
        title: 'Profile updated',
        description: 'Your personal information has been saved.',
      });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Failed to save profile. Please try again.';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    toast({
      title: "Copied!",
      description: "Backup codes copied to clipboard",
    });
  };

  return (
    <div className="space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and account settings</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full grid grid-cols-5 bg-card/50 border border-border/30 p-1 rounded-xl">
          <TabsTrigger value="personal" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg px-2 py-2 text-sm">
            <User size={16} className="mr-2 hidden sm:inline" />
            <span className="hidden md:inline">Personal Info</span>
            <span className="md:hidden">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="verification" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg px-2 py-2 text-sm">
            <Shield size={16} className="mr-2 hidden sm:inline" />
            <span className="hidden md:inline">Verification / KYC</span>
            <span className="md:hidden">KYC</span>
          </TabsTrigger>
          <TabsTrigger value="tax" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg px-2 py-2 text-sm">
            <FileText size={16} className="mr-2 hidden sm:inline" />
            <span className="hidden md:inline">Tax Forms</span>
            <span className="md:hidden">Tax</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg px-2 py-2 text-sm">
            <Lock size={16} className="mr-2 hidden sm:inline" />
            Security
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg px-2 py-2 text-sm">
            <Settings size={16} className="mr-2 hidden sm:inline" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="mt-8">
          <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="firstName" className="text-muted-foreground text-sm">First Name</Label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="firstName" 
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                    disabled={isSavingProfile}
                    className="pl-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="lastName" className="text-muted-foreground text-sm">Last Name</Label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="lastName" 
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                    disabled={isSavingProfile}
                    className="pl-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-muted-foreground text-sm">Email Address</Label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email"
                    value={profileForm.email}
                    readOnly
                    disabled
                    className="pl-12 py-6 bg-muted/20 border-border/30 rounded-xl text-base opacity-60 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-muted-foreground text-sm">Phone Number</Label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="phone" 
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="Enter phone number"
                    disabled={isSavingProfile}
                    className="pl-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="country" className="text-muted-foreground text-sm">Country</Label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="country" 
                    value={profileForm.country}
                    onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                    placeholder="Enter country"
                    disabled={isSavingProfile}
                    className="pl-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="timezone" className="text-muted-foreground text-sm">Timezone</Label>
                <div className="relative">
                  <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="timezone" 
                    value={profileForm.timezone}
                    onChange={(e) => setProfileForm({ ...profileForm, timezone: e.target.value })}
                    placeholder="e.g. America/New_York"
                    disabled={isSavingProfile}
                    className="pl-12 py-6 bg-muted/20 border-border/30 focus:border-primary/50 rounded-xl text-base"
                  />
                </div>
              </div>
            </div>

            <Button 
              className="mt-10 btn-gradient-animated text-primary-foreground px-8 py-6 text-base"
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
            >
              {isSavingProfile && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isSavingProfile ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </TabsContent>

        {/* Verification / KYC Tab */}
        <TabsContent value="verification" className="mt-8">
          <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <Shield size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">KYC Verification</h3>
                <p className="text-sm text-muted-foreground">{kycCompleted} of {kycSteps.length} Complete</p>
              </div>
            </div>

            {/* Helper Text */}
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-8">
              <p className="text-sm text-yellow-500">Verification is required before payouts can be processed.</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <Progress value={kycProgress} className="h-2 bg-muted/30" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <CheckCircle size={20} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Email Verified</span>
                </div>
                <span className="text-xs text-primary font-semibold px-3 py-1 rounded-full bg-primary/20">Complete</span>
              </div>

              <div className="flex items-center justify-between p-5 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <CheckCircle size={20} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Phone Verified</span>
                </div>
                <span className="text-xs text-primary font-semibold px-3 py-1 rounded-full bg-primary/20">Complete</span>
              </div>

              <div className="flex items-center justify-between p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <AlertCircle size={20} className="text-yellow-500" />
                  </div>
                  <span className="text-sm font-medium text-foreground">ID Verification</span>
                </div>
                <span className="text-xs text-yellow-500 font-semibold px-3 py-1 rounded-full bg-yellow-500/20">Pending</span>
              </div>
            </div>

            <Button className="w-full mt-8 btn-gradient-animated text-primary-foreground py-6 text-base">
              Start Verification
            </Button>
          </div>
        </TabsContent>

        {/* Tax Forms Tab */}
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

            {/* Helper Text */}
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-8">
              <p className="text-sm text-yellow-500">Tax forms are required before payouts can be released.</p>
            </div>

            {/* Tax Form Status */}
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
                <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-4 block">Upload Tax Form</Label>
                <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload size={32} className="text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Drag and drop your tax form here, or click to browse</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">Accepted formats: PDF, JPG, PNG (Max 10MB)</p>
                </div>
              </div>

              {/* Submission Info (shown when submitted) */}
              <div className="p-5 rounded-xl bg-muted/10 border border-border/20 opacity-50">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">Submitted Form</Label>
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

        {/* Security Tab */}
        <TabsContent value="security" className="mt-8">
          <div className="space-y-8">
            {/* 2FA Section */}
            <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <Smartphone size={28} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>

              {twoFactorEnabled ? (
                <div className="space-y-6">
                  {/* QR Code Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl bg-muted/20 border border-border/30">
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-4 block">Scan QR Code</Label>
                      <div className="bg-white p-4 rounded-xl w-fit mx-auto">
                        {/* Placeholder QR Code */}
                        <div className="w-32 h-32 bg-gradient-to-br from-foreground/80 to-foreground flex items-center justify-center rounded">
                          <div className="grid grid-cols-5 gap-1 p-2">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div key={i} className={`w-4 h-4 ${Math.random() > 0.5 ? 'bg-white' : 'bg-foreground'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-4">Scan with Google Authenticator or Authy</p>
                    </div>

                    <div className="p-6 rounded-xl bg-muted/20 border border-border/30">
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-4 block">Or Enter Code Manually</Label>
                      <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                        <code className="text-sm text-primary font-mono break-all">JBSWY3DPEHPK3PXP</code>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4 gap-2" onClick={() => {
                        navigator.clipboard.writeText('JBSWY3DPEHPK3PXP');
                        toast({ title: "Copied!", description: "Secret key copied to clipboard" });
                      }}>
                        <Copy size={14} />
                        Copy Secret Key
                      </Button>
                    </div>
                  </div>

                  {/* Verification Code Input */}
                  <div className="space-y-3">
                    <Label htmlFor="verifyCode" className="text-muted-foreground text-sm">Enter Verification Code</Label>
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

                  {/* Backup Codes */}
                  <div className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Key size={20} className="text-yellow-500" />
                        <div>
                          <h4 className="text-sm font-semibold text-foreground">Backup Codes</h4>
                          <p className="text-xs text-muted-foreground">Save these codes in a secure location</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setShowBackupCodes(!showBackupCodes)}>
                        {showBackupCodes ? 'Hide' : 'Show'} Codes
                      </Button>
                    </div>
                    
                    {showBackupCodes && (
                      <div className="mt-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                          {backupCodes.map((code, index) => (
                            <div key={index} className="p-2 rounded-lg bg-muted/30 border border-border/30 text-center">
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
                    Two-factor authentication adds an extra layer of security by requiring a code from your phone in addition to your password when signing in.
                  </p>
                </div>
              )}
            </div>

            {/* Change Password Section */}
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

              {/* Last Password Change */}
              <div className="p-4 rounded-xl bg-muted/20 border border-border/30 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Last password change</p>
                    <p className="text-sm text-foreground font-medium">December 1, 2024</p>
                  </div>
                </div>
              </div>

              {/* Change Password Form */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="currentPassword" className="text-muted-foreground text-sm">Current Password</Label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="currentPassword" 
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
                  <Label htmlFor="newPassword" className="text-muted-foreground text-sm">New Password</Label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="newPassword" 
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
                  <Label htmlFor="confirmPassword" className="text-muted-foreground text-sm">Confirm New Password</Label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="confirmPassword" 
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

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-8">
          <div className="space-y-8">
            {/* Notification Preferences */}
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

            {/* Display Settings */}
            <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h3 className="text-lg font-semibold text-foreground">Session & Display Settings</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="defaultTimezone" className="text-muted-foreground text-sm">Default Timezone</Label>
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
                  <Label htmlFor="dateFormat" className="text-muted-foreground text-sm">Date Format</Label>
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

            {/* Account Preferences */}
            <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h3 className="text-lg font-semibold text-foreground">Account Preferences</h3>
              </div>

              <div className="space-y-3">
                <Label htmlFor="payoutMethod" className="text-muted-foreground text-sm">Default Payout Method</Label>
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
      </Tabs>
    </div>
  );
};

export default DashboardProfile;
