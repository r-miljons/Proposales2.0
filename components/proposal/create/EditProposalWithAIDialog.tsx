import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Send } from "lucide-react";
import { TypographySmall } from "@/components/ui/Typography";

interface EditProposalWithAIDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
  onDescriptionChange: (desc: string) => void;
  loading: boolean;
  onSubmit: () => void;
  aiEditError: boolean;
  children: React.ReactNode;
}

export function EditProposalWithAIDialog({
  open,
  onOpenChange,
  description,
  onDescriptionChange,
  loading,
  onSubmit,
  aiEditError,
  children,
}: EditProposalWithAIDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-2 w-[90vw] max-w-[330px] bg-card">
        <DialogTitle>Edit with AI</DialogTitle>
        <p className="text-muted-foreground text-sm mb-2">
          Describe the changes you want to make.
        </p>
        <Textarea
          id="ai-edit-description"
          value={description}
          onChange={e => onDescriptionChange(e.target.value)}
          placeholder="Type your changes here..."
          className="resize-none"
          rows={4}
          disabled={loading}
        />
        <Button className="w-full mt-2 flex items-center justify-center" type="button" onClick={onSubmit} disabled={loading} size="sm">
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
        {aiEditError && (
          <TypographySmall className="text-destructive mb-3">There was an issue applying changes.</TypographySmall>
        )}
      </DialogContent>
    </Dialog>
  );
}
