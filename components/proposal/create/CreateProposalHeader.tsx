"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TypographySmall } from "@/components/ui/Typography";
import SavedStatusBadge from "./SavedStatusBadge";
import { Button } from "@/components/ui/button";
import { UserPlus, Info } from "lucide-react";
import CreateProposalSaveButton from "./CreateProposalSaveButton";
import { useCreateProposalState } from "@/hooks/useCreateProposalState";
import React from "react";

const CreateProposalHeader: React.FC = () => {
  const { state } = useCreateProposalState();
  const title = state?.proposal?.title_md?.trim();

  return (
    <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <div className="flex items-center gap-2 hidden md:flex">
        <SavedStatusBadge />
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <Button variant="secondary">
          <UserPlus className="mr-2" />
          Add Recipient
        </Button>
        <CreateProposalSaveButton />
      </div>
    </header>
  );
};

export default CreateProposalHeader;
