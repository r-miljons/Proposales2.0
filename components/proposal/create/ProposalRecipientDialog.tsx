import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Save } from 'lucide-react';
import { DiscardChangesDialog } from './DiscardChangesDialog';
import type { ProposalRecipient } from '@/types/proposal';
import { Label } from '@/components/ui/label';

interface ProposalRecipientDialogProps {
  open: boolean;
  initialRecipient: ProposalRecipient;
  onSave: (recipient: ProposalRecipient) => void;
  onCancel: () => void;
}

export const ProposalRecipientDialog: React.FC<ProposalRecipientDialogProps> = ({
  open,
  initialRecipient,
  onSave,
  onCancel,
}) => {
  const [recipient, setRecipient] = useState<ProposalRecipient>({
    first_name: initialRecipient.first_name || '',
    last_name: initialRecipient.last_name || '',
    email: initialRecipient.email || '',
    phone: initialRecipient.phone || '',
    company_name: initialRecipient.company_name || '',
    ...(initialRecipient.sources ? { sources: initialRecipient.sources } : {})
  });
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  // Reset recipient state when dialog is opened with a different initialRecipient
  React.useEffect(() => {
    if (open) {
      setRecipient({
        first_name: initialRecipient.first_name || '',
        last_name: initialRecipient.last_name || '',
        email: initialRecipient.email || '',
        phone: initialRecipient.phone || '',
        company_name: initialRecipient.company_name || '',
        ...(initialRecipient.sources ? { sources: initialRecipient.sources } : {})
      });
    }
  }, [open, initialRecipient]);

  // Helper to check if there are unsaved changes
  const hasUnsavedChanges = useCallback(() => {
    const fields: (keyof ProposalRecipient)[] = [
      'first_name',
      'last_name',
      'email',
      'phone',
      'company_name',
    ];
    return fields.some(field => (recipient[field] || '') !== (initialRecipient[field] || ''));
  }, [recipient, initialRecipient]);

  const handleChange = (field: keyof typeof recipient) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient({ ...recipient, [field]: e.target.value });
  };

  const handleSave = () => {
    onSave(recipient);
  };

  // Intercept dialog close/cancel
  const handleCancel = () => {
    if (hasUnsavedChanges()) {
      setShowDiscardDialog(true);
    } else {
      onCancel();
    }
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
    // Only handle close (not open)
    if (!nextOpen) {
      handleCancel();
    }
  };

  const handleDiscard = () => {
    setShowDiscardDialog(false);
    onCancel();
  };
  const handleDiscardDialogClose = () => {
    setShowDiscardDialog(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Edit Recipient
            </DialogTitle>
            <DialogDescription>Edit the recipient details below.</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" value={recipient.first_name || ''} onChange={handleChange('first_name')} autoFocus />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" value={recipient.last_name || ''} onChange={handleChange('last_name')} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={recipient.email || ''} onChange={handleChange('email')} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={recipient.phone || ''} onChange={handleChange('phone')} />
            </div>
            <div>
              <Label htmlFor="company_name">Company Name</Label>
              <Input id="company_name" value={recipient.company_name || ''} onChange={handleChange('company_name')} />
            </div>
            <DialogFooter className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <DiscardChangesDialog
        open={showDiscardDialog}
        onClose={handleDiscardDialogClose}
        onDiscard={handleDiscard}
      />
    </>
  );
};
