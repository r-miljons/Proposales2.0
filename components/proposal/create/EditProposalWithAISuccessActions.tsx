import React from "react";
import { Button } from "@/components/ui/button";
import { TypographySmall } from "@/components/ui/Typography";
import { Check } from "lucide-react";

interface EditProposalWithAISuccessActionsProps {
  onAccept: () => void;
  onReject: () => void;
}

export const EditProposalWithAISuccessActions: React.FC<EditProposalWithAISuccessActionsProps> = ({ onAccept, onReject }) => {
  return (
    <div className="flex flex-col items-center w-full space-y-3 mb-2">
      <TypographySmall className="text-muted-foreground">Changes were applied successfully.</TypographySmall>
      <div className="flex w-full space-x-2">
        <Button
          variant="outline"
          className="w-1/2"
          onClick={onReject}
          type="button"
        >
          Reject
        </Button>
        <Button
          variant="default"
          className="w-1/2 bg-success text-white hover:bg-success/90 focus:ring-success"
          onClick={onAccept}
          type="button"
        >
          <Check className="w-4 h-4 mr-1" />
          Accept
        </Button>
      </div>
    </div>
  );
};
