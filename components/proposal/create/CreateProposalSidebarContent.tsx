"use client";

import * as React from "react";
import { SidebarContent } from "@/components/ui/sidebar";
import { FileUpload } from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProposalState } from "@/hooks/useCreateProposalState";
import type { CreateProposalState } from "@/components/providers/CreateProposalStateProvider";

export function CreateProposalSidebarContent() {
  const { state, setState } = useCreateProposalState();
  const { proposal } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prev: CreateProposalState) => ({
      ...prev,
      proposal: {
        ...prev.proposal,
        [name]: value,
      },
    }));
  };

  return (
    <SidebarContent>
      <form className="space-y-6 p-4">
        <div className="space-y-2">
          <Label htmlFor="proposal-title">Title</Label>
          <Input
            id="proposal-title"
            name="title_md"
            placeholder="Enter proposal title"
            value={proposal.title_md || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="proposal-description">Description</Label>
          <Textarea
            id="proposal-description"
            name="description_md"
            placeholder="Enter proposal description"
            value={proposal.description_md || ""}
            onChange={handleChange}
          />
        </div>
      </form>
    </SidebarContent>
  );
}
