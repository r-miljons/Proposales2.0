import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { saveAuth } from '@/app/api/client/utils/saveAuth';
import { deleteAuth } from '@/app/api/client/utils/deleteAuth';
import { fetchCompanies } from '@/app/api/client/companyApi';
import type { AuthData } from '@/types/auth';

interface AuthenticateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (apiKey: string) => void;
  loading?: boolean;
}

export const AuthenticateDialog: React.FC<AuthenticateDialogProps> = ({
  open,
  onOpenChange,
  onContinue,
  loading = false,
}) => {
  const [apiKey, setApiKey] = React.useState("");
  const [isVerified, setIsVerified] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);
  const [verifyFailed, setVerifyFailed] = React.useState(false);
  const [lastFailedApiKey, setLastFailedApiKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) {
      setApiKey("");
      setIsVerified(false);
      setVerifying(false);
      setVerifyFailed(false);
      setLastFailedApiKey(null);
    }
  }, [open]);

  const handleVerify = async () => {
    setVerifying(true);
    setVerifyFailed(false);
    // Save only the key (no company) to localStorage
    const auth: AuthData = { key: apiKey };
    saveAuth(auth);
    try {
      const companies = await fetchCompanies();
      setIsVerified(true);
      setVerifying(false);
      setVerifyFailed(false);
      setLastFailedApiKey(null);
      // For testing, log the response
      console.log('Verified companies:', companies);
    } catch (err) {
      setIsVerified(false);
      setVerifying(false);
      setVerifyFailed(true);
      setLastFailedApiKey(apiKey);
      deleteAuth();
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Authenticate
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            type="password"
            placeholder="Enter your API Key"
            value={apiKey}
            onChange={e => {
              const newValue = e.target.value;
              setApiKey(newValue);
              setIsVerified(false);
              // If the input has changed since the last failed attempt, clear the failed state
              if (lastFailedApiKey !== null && newValue !== lastFailedApiKey) {
                setVerifyFailed(false);
                setLastFailedApiKey(null);
              }
            }}
            autoFocus
            className="flex-1"
            data-testid="api-key-input"
          />
          <Button
            type="button"
            variant={isVerified ? "outline" : verifyFailed ? "destructive" : "default"}
            onClick={handleVerify}
            disabled={verifying || !apiKey || isVerified}
            className="shrink-0"
            data-testid="verify-btn"
          >
            {isVerified ? (
              <span className="flex items-center gap-1 text-green-600">
                <span>Verified</span>
              </span>
            ) : verifying ? (
              <span>Verifying...</span>
            ) : verifyFailed ? (
              <span className="flex items-center gap-1 text-white">Failed</span>
            ) : (
              <span>Verify</span>
            )}
          </Button>
        </div>
        {verifyFailed && (
          <Alert variant="destructive" className="mt-3 text-destructive-bright">
            <AlertCircle className="h-5 w-5" />
            <div>
              <AlertTitle>Authentication Failed</AlertTitle>
              <AlertDescription>
                The API key you entered is invalid. Please check your key and try again.
              </AlertDescription>
            </div>
          </Alert>
        )}
        <DialogFooter>
          <Button
            onClick={() => onContinue(apiKey)}
            disabled={!isVerified || loading}
            className="w-full"
            data-testid="continue-btn"
          >
            {loading ? "Loading..." : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
