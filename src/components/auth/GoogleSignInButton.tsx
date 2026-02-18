// =============================================================================
// GoogleSignInButton
// =============================================================================
// Renders the Google One-Tap / Sign-In button using @react-oauth/google.
// On success, calls the provided onSuccess callback with the Google credential
// (ID token) string. The parent component then passes it to authApi.googleAuth.
// =============================================================================

import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { toast } from 'sonner';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

interface GoogleSignInButtonProps {
  /** Called with the Google ID token on successful sign-in. */
  onSuccess: (idToken: string) => void | Promise<void>;
  /** Optional text variant. */
  text?: 'signin_with' | 'signup_with' | 'continue_with';
}

const GoogleSignInButton = ({
  onSuccess,
  text = 'continue_with',
}: GoogleSignInButtonProps) => {
  const handleSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      onSuccess(response.credential);
    } else {
      toast.error('Google sign-in failed. Please try again.');
    }
  };

  const handleError = () => {
    toast.error('Google sign-in was cancelled or failed. Please try again.');
  };

  if (!googleClientId) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground bg-muted/30 rounded-lg">
        Google sign-in is not configured. Please contact support.
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <GoogleLogin
        clientId={googleClientId}
        onSuccess={handleSuccess}
        onError={handleError}
        text={text}
        shape="rectangular"
        size="large"
        width="100%"
        theme="outline"
      />
    </div>
  );
};

export default GoogleSignInButton;
