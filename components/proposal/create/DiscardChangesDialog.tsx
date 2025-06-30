import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DiscardChangesDialogProps {
  open: boolean;
  onClose: () => void;
  onDiscard: () => void;
}

export function DiscardChangesDialog({ open, onClose, onDiscard }: DiscardChangesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={open ? onClose : onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Discard changes?</DialogTitle>
        </DialogHeader>
        <div className="py-2">You have unsaved changes. Are you sure you want to discard them?</div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" type="button" onClick={onClose}>
            No
          </Button>
          <Button variant="destructive" type="button" onClick={onDiscard}>
            Yes, discard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
