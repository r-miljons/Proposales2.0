import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, AlertCircle, Check, RotateCw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { saveAuth } from '@/app/api/client/utils/auth/saveAuth';
import { deleteAuth } from '@/app/api/client/utils/auth/deleteAuth';
import { fetchCompanies } from '@/app/api/client/companyApi';
import type { AuthData } from '@/types/auth';
import type { Company } from '@/types/company';
import { CompanyCard } from '@/components/company/company-card';
import { TypographySmall, TypographyH4 } from '@/components/ui/Typography';
import { logIn } from "@/app/api/client/utils/auth/logIn";

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
  const [verifiedCompanies, setVerifiedCompanies] = React.useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = React.useState<number | null>(null);
  // Local component state for auth data
  const [authData, setAuthData] = React.useState<AuthData | undefined>(undefined);

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
    setVerifiedCompanies([]);
    // Store only in local state, not localStorage
    setAuthData({ key: apiKey });
    try {
      const companies = await fetchCompanies({ key: apiKey });
      setIsVerified(true);
      setVerifying(false);
      setVerifyFailed(false);
      setLastFailedApiKey(null);
      setVerifiedCompanies(Array.isArray(companies) ? companies : []);
    } catch (err) {
      setIsVerified(false);
      setVerifying(false);
      setVerifyFailed(true);
      setLastFailedApiKey(apiKey);
      setVerifiedCompanies([]);
      setAuthData(undefined); // Clear authData on failure
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
        <form
          className="flex items-center gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleVerify();
          }}
        >
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
            type="submit"
            disabled={verifying || !apiKey || isVerified}
            variant={verifyFailed && !isVerified ? "outline" : undefined}
            className={verifyFailed && !isVerified ? "shrink-0" : "shrink-0 bg-success text-white hover:bg-success/90 focus:ring-success"}
            data-testid="verify-btn"
          >
            {isVerified && <Check className="w-4 h-4 mr-1" />}
            {verifyFailed && !isVerified && <RotateCw className="w-4 h-4 mr-1" />}
            {verifying
              ? 'Verifying...'
              : isVerified
                ? 'Verified'
                : verifyFailed
                  ? 'Try Again'
                  : 'Verify'}
          </Button>
        </form>
        {verifyFailed && (
          <Alert variant="destructive" className="text-destructive-bright">
            <AlertCircle className="h-5 w-5" />
            <div>
              <AlertTitle>Authentication Failed</AlertTitle>
              <AlertDescription>
                The API key you entered is invalid. Please check your key and try again.
              </AlertDescription>
            </div>
          </Alert>
        )}
        {isVerified && (
          <TypographySmall>Select your company:</TypographySmall>
        )}
        {/* Show verified companies as cards if verified and companies exist */}
        {isVerified && verifiedCompanies.length > 0 && (
          <div className="space-y-2 mt-2">
            {verifiedCompanies.map(company => (
              <CompanyCard
                key={company.id}
                company={company}
                isSelected={selectedCompanyId === company.id}
                onSelectionChange={() => setSelectedCompanyId(selectedCompanyId === company.id ? null : company.id)}
              />
            ))}
          </div>
        )}

        {/* Show warning alert if verified but no companies found */}
        {isVerified && verifiedCompanies.length === 0 && (
          <Alert variant="warning">
            <AlertCircle className="h-5 w-5 text-warning mr-2" />
            <div>
              <AlertTitle>No companies found</AlertTitle>
              <AlertDescription>
                The provided API key is not linked to any companies. Please contact the support: <strong>support@proposales.com</strong>
              </AlertDescription>
            </div>
          </Alert>
        )}
        <DialogFooter>
          <Button
            onClick={() => {
              if (selectedCompanyId !== null) {
                const selectedCompany = verifiedCompanies.find(c => c.id === selectedCompanyId);
                if (selectedCompany && authData) {
                  logIn({ ...authData, company: selectedCompany });
                }
              }
              onContinue(apiKey);
            }}
            disabled={!isVerified || loading || selectedCompanyId === null}
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
