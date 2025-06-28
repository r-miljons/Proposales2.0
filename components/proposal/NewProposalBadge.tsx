"use client";

import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";
import React from "react";

/**
 * NewProposalBadge - A badge with a pulsing green circle and label.
 * Absolutely positioned top-left, intended for use in card images.
 */
export const NewProposalBadge: React.FC = () => (
  <>
    <style>{`
      @keyframes pulse-opacity {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .pulse-opacity {
        animation: pulse-opacity 1.2s infinite;
      }
    `}</style>
    <Badge
      className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 bg-white/90 text-black text-sm shadow-none font-medium rounded-full"
      style={{ zIndex: 2 }}
    >
      <Circle className="size-3 fill-[hsl(var(--success))] text-[hsl(var(--success))] pulse-opacity" aria-hidden="true" />
      New Proposal
    </Badge>
  </>
);

export default NewProposalBadge;
