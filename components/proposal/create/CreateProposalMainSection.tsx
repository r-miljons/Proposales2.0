"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import React from "react";
import CreateProposalHeader from "./CreateProposalHeader";

const CreateProposalMainSection: React.FC = () => {
  return (
    <SidebarInset>
      <CreateProposalHeader />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
          />
        ))}
      </div>
    </SidebarInset>
  );
};

export default CreateProposalMainSection;
