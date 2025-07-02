import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2Icon, Send } from "lucide-react";
import { TypographySmall } from "@/components/ui/Typography";

interface EditProposalWithAIPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
  onDescriptionChange: (desc: string) => void;
  loading: boolean;
  onSubmit: () => void;
  aiEditError: boolean;
  children: React.ReactNode;
}

export function EditProposalWithAIPopover({
  open,
  onOpenChange,
  description,
  onDescriptionChange,
  loading,
  onSubmit,
  aiEditError,
  children,
}: EditProposalWithAIPopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[270px] bg-card space-y-2 sm:w-[330px]">
        <Label htmlFor="ai-edit-description" className="mb-2 block">Edit with AI</Label>
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
      </PopoverContent>
    </Popover>
  );
}
