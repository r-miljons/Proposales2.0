import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import type { ProposalBlock } from "@/types/proposal";
import { Button } from "@/components/ui/button";
import { DiscardChangesDialog } from "./DiscardChangesDialog";
import { SectionFields } from "./SectionFields";
import { getDefaultBlock } from "@/lib/getDefaultBlock";

interface SectionEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  block?: ProposalBlock;
  onBlockChange?: (updatedBlock: ProposalBlock) => void;
}

export function SectionEditorDialog({ open, onOpenChange, block, onBlockChange }: SectionEditorDialogProps) {
    const [localBlock, setLocalBlock] = React.useState<ProposalBlock>(getDefaultBlock(block));
  const [showDiscardDialog, setShowDiscardDialog] = React.useState(false);
  const [pendingClose, setPendingClose] = React.useState(false);

  // Intercept dialog close
  const handleDialogOpenChange = (next: boolean) => {
    if (!next) {
      const baseBlock = block ? block : getDefaultBlock();
      const hasChanges = JSON.stringify(baseBlock) !== JSON.stringify(localBlock ?? {});
      if (hasChanges) {
        setShowDiscardDialog(true);
        setPendingClose(true);
        return;
      }
    }
    onOpenChange(next);
  };



  React.useEffect(() => {
    setLocalBlock(getDefaultBlock(block));
  }, [block, open]);

  const handleChange = (field: keyof ProposalBlock, value: string) => {
    setLocalBlock(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (localBlock && onBlockChange) {
      onBlockChange(localBlock);
    }
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-muted-foreground">Add New Section</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4 mt-2"
        >
          <SectionFields block={localBlock} onChange={handleChange} />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => handleDialogOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

      {/* Discard Changes Confirmation Dialog */}
      <DiscardChangesDialog
        open={showDiscardDialog}
        onClose={() => {
          setShowDiscardDialog(false);
          setPendingClose(false);
        }}
        onDiscard={() => {
          setShowDiscardDialog(false);
          setPendingClose(false);
          onOpenChange(false);
        }}
      />
    </>
  );
}

