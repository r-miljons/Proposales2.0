"use client";

import * as React from "react";
import { SidebarContent } from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProposalState } from "@/hooks/useCreateProposalState";
import type { CreateProposalState } from "@/components/providers/CreateProposalStateProvider";
import { ProposalSectionsList } from "./ProposalSectionsList";
import { BackgroundImageSelector } from "./BackgroundImageSelector";
import { ProposalRecipientCard } from "./ProposalRecipientCard";

function isProposalMedia(obj: unknown): obj is import("@/types/proposal").ProposalMedia {
  return !!obj && typeof obj === "object" && "uuid" in obj && typeof (obj as any).uuid === "string";
}

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
          <Label className="text-sm">Recipient</Label>
          <ProposalRecipientCard
            recipient={proposal.recipient}
            onRecipientChange={recipient =>
              setState((prev: CreateProposalState) => ({
                ...prev,
                proposal: {
                  ...prev.proposal,
                  recipient,
                },
              }))
            }
          />
        </div>
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
          <Label htmlFor="proposal-description">Intro</Label>
          <Textarea
            id="proposal-description"
            name="description_md"
            placeholder="Enter proposal description"
            rows={5}
            value={proposal.description_md || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <BackgroundImageSelector
            label="Main image"
            value={isProposalMedia(proposal.background_image) ? proposal.background_image : null}
            onChange={bg =>
              setState((prev: CreateProposalState) => ({
                ...prev,
                proposal: {
                  ...prev.proposal,
                  background_image: bg ?? undefined,
                },
              }))
            }
          />

        </div>
        <div className="space-y-2">
          <Label>Sections</Label>
          <ProposalSectionsList
            blocks={proposal.blocks || []}
            onBlocksChange={blocks =>
              setState((prev: CreateProposalState) => ({
                ...prev,
                proposal: {
                  ...prev.proposal,
                  blocks,
                },
              }))
            }
          />
        </div>
      </form>
    </SidebarContent>
  );
}
