import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateProposalState } from "@/hooks/useCreateProposalState";
import { editProposalWithAI } from "@/app/api/client/utils/proposal/editProposalWithAI";
import { Loader2Icon } from "lucide-react";
import { EditProposalWithAISuccessActions } from "./EditProposalWithAISuccessActions";
import { TypographySmall } from "@/components/ui/Typography";

export function EditProposalWithAICard() {
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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full border border-[rgba(147,51,234,0.5)]">
            Edit with AI
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[270px] bg-card space-y-2 sm:w-[330px]">
          <Label htmlFor="ai-edit-description" className="mb-2 block">Edit with AI</Label>
          <p className="text-muted-foreground text-sm mb-2">
            Describe the changes you want to make.
          </p>
          <Textarea
            id="ai-edit-description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Type your changes here..."
            className="resize-none"
            rows={4}
            disabled={loading}
          />
          <Button className="w-full mt-2 flex items-center justify-center" type="button" onClick={handleSubmit} disabled={loading} size="sm">
            {loading ? (
              <>
                <Loader2Icon className="animate-spin w-4 h-4 mr-2" />
                Editing
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" /> Submit
              </>
            )}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

