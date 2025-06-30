"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { DefaultCardActions } from "./DefaultCardActions";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import type { ProposalRecipient } from "@/types/proposal";

import { ProposalRecipientDialog } from "./ProposalRecipientDialog";

export function ProposalRecipientCard({ recipient, onRecipientChange }: {
  recipient?: ProposalRecipient;
  onRecipientChange?: (recipient?: ProposalRecipient) => void;
}) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Handler to edit recipient (open dialog)
  const handleEdit = React.useCallback(() => {
    setDialogOpen(true);
  }, []);

  // Handler to remove recipient (clear and notify parent)
  const handleRemove = React.useCallback(() => {
    onRecipientChange?.(undefined);
  }, [onRecipientChange]);

  return (
    <>
      {recipient ? (
        <Card className="w-full p-4 pr-12 group relative min-h-[90px] cursor-text">
          <DefaultCardActions<ProposalRecipient>
            item={recipient}
            onEdit={handleEdit}
            onRemove={handleRemove}
            uuidKey="email"
          />
          <CardTitle>
            {[recipient.first_name, recipient.last_name].filter(Boolean).join(" ") || recipient.company_name || recipient.email || recipient.phone || "Recipient"}
          </CardTitle>
          <CardDescription className="mt-2">
            {recipient.company_name && <div>{recipient.company_name}</div>}
            {recipient.email && <div>{recipient.email}</div>}
            {recipient.phone && <div>{recipient.phone}</div>}
            {!recipient.company_name && !recipient.email && !recipient.phone && (
                <div>No contact details</div>
            )}
          </CardDescription>
        </Card>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={() => setDialogOpen(true)}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Recipient
        </Button>
      )}
      <ProposalRecipientDialog
        open={dialogOpen}
        initialRecipient={recipient || {}}
        onSave={r => {
          setDialogOpen(false);
          onRecipientChange?.(r);
        }}
        onCancel={() => setDialogOpen(false)}
      />
    </>
  );
}
