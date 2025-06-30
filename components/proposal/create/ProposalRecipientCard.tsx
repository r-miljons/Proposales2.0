"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export function ProposalRecipientCard() {
  return (
    <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center"
    >
        <UserPlus className="mr-2 h-4 w-4" />
        Add Recipient
    </Button>
  );
}
