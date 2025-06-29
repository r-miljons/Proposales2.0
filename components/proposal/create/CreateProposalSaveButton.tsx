"use client";

import { Button } from "@/components/ui/button";
import { Save as SaveIcon } from "lucide-react";
import React from "react";
import { saveServerProposal } from '@/app/api/client/utils/saveServerProposal';
import { useServerProposalSaveStatus } from '@/hooks/useServerProposalSaveStatus';

import { Loader2 } from "lucide-react";

const CreateProposalSaveButton: React.FC = () => {
  const status = useServerProposalSaveStatus();
  const isSaved = status?.isSaved;
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await saveServerProposal();
    } finally {
      setLoading(false);
    }
  };

  let buttonText = "Save";
  if (loading) buttonText = "Saving...";
  else if (isSaved) buttonText = "Saved";

  return (
    <Button onClick={handleClick} disabled={loading || isSaved} variant={loading ? "secondary" : undefined}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <SaveIcon className="mr-2" />}
      {buttonText}
    </Button>
  );
};

export default CreateProposalSaveButton;
