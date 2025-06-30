"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import React from "react";
import CreateProposalHeader from "./CreateProposalHeader";
import ProposalPreview from "./ProposalPreview";

const CreateProposalMainSection: React.FC = () => {
  return (
    <SidebarInset>
      <CreateProposalHeader />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ProposalPreview />
      </div>
    </SidebarInset>
  );
};

export default CreateProposalMainSection;
