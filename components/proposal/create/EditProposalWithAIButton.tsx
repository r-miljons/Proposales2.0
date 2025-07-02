import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditProposalWithAIDialog } from "./EditProposalWithAIDialog";
import { EditProposalWithAIPopover } from "./EditProposalWithAIPopover";
import { useCreateProposalState } from "@/hooks/useCreateProposalState";
import { editProposalWithAI } from "@/app/api/client/utils/proposal/editProposalWithAI";
import { EditProposalWithAISuccessActions } from "./EditProposalWithAISuccessActions";
import { TypographySmall } from "@/components/ui/Typography";
import { useIsMobile } from "@/hooks/use-mobile";

export function EditProposalWithAIButton() {
  const [aiEditSuccess, setAiEditSuccess] = useState(false);
  const [aiEditError, setAiEditError] = useState(false);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { state, setState } = useCreateProposalState();
  const prevProposalRef = React.useRef<typeof state.proposal | null>(null);

  const handleSubmit = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      prevProposalRef.current = state.proposal;
      const editedProposal = await editProposalWithAI(state.proposal, description);
      setState(prev => ({ ...prev, proposal: editedProposal }));
      setOpen(false);
      setDescription("");
      setAiEditSuccess(true);
      setAiEditError(false);
    } catch (error) {
      setAiEditError(true);
    } finally {
      setLoading(false);
    }
  };

  const isMobile = useIsMobile();

  return (
    <div className="w-full">
      {aiEditSuccess && (
        <EditProposalWithAISuccessActions
          onAccept={() => setAiEditSuccess(false)}
          onReject={() => {
            if (prevProposalRef.current) {
              setState(prev => ({ ...prev, proposal: prevProposalRef.current! }));
            }
            setAiEditSuccess(false);
          }}
        />
      )}
      {aiEditError && !aiEditSuccess && (
        <TypographySmall className="text-destructive mb-3">There was an issue applying changes.</TypographySmall>
      )}
      {isMobile ? (
        <EditProposalWithAIDialog
          open={open}
          onOpenChange={setOpen}
          description={description}
          onDescriptionChange={setDescription}
          loading={loading}
          onSubmit={handleSubmit}
          aiEditError={aiEditError && !aiEditSuccess}
        >
          <Button variant="outline" className="w-full border border-[rgba(147,51,234,0.5)]">
            Edit with AI
          </Button>
        </EditProposalWithAIDialog>
      ) : (
        <EditProposalWithAIPopover
          open={open}
          onOpenChange={setOpen}
          description={description}
          onDescriptionChange={setDescription}
          loading={loading}
          onSubmit={handleSubmit}
          aiEditError={aiEditError && !aiEditSuccess}
        >
          <Button variant="outline" className="w-full border border-[rgba(147,51,234,0.5)]">
            Edit with AI
          </Button>
        </EditProposalWithAIPopover>
      )}
    </div>
  );
}

