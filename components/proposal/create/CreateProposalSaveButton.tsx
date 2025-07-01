"use client";

import { Button } from "@/components/ui/button";
import { Save as SaveIcon } from "lucide-react";
import React from "react";
import { saveServerProposal } from '@/app/api/client/utils/proposal/saveProposalServer';
import { useServerProposalSaveStatus } from '@/hooks/useServerProposalSaveStatus';
import { Loader2 } from "lucide-react";
import { getAuth } from '@/app/api/client/utils/auth/getAuth';
import { AuthenticateDialog } from '@/components/auth/authenticate-dialog';

const CreateProposalSaveButton: React.FC = () => {
  const status = useServerProposalSaveStatus();
  const isSaved = status?.isSaved;
  const [loading, setLoading] = React.useState(false);
  const [authDialogOpen, setAuthDialogOpen] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(false);

  const handleClick = async () => {
    const auth = getAuth();
    if (!auth) {
      setAuthDialogOpen(true);
      setPendingSave(true);
      return;
    }
    await doSave();
  };

  const doSave = async () => {
    setLoading(true);
    try {
      await saveServerProposal();
    } finally {
      setLoading(false);
      setPendingSave(false);
    }
  };

  const handleAuthContinue = async () => {
    setAuthDialogOpen(false);
    // Try to save after authentication
    if (pendingSave) {
      await doSave();
    }
  };

  let buttonText = "Save";
  if (loading) buttonText = "Saving...";
  else if (isSaved) buttonText = "Saved";

  return (
    <>
      <Button onClick={handleClick} disabled={loading || isSaved} variant={loading ? "secondary" : undefined}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <SaveIcon className="mr-2" />}
        {buttonText}
      </Button>
      <AuthenticateDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onContinue={handleAuthContinue}
      />
    </>
  );
};

export default CreateProposalSaveButton;
