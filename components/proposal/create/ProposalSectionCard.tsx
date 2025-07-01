"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, GripVertical } from "lucide-react";
import { DefaultCardActions } from "./DefaultCardActions";
import type { ProposalBlock } from "@/types/proposal";
import ProposalSectionCardImageDisplay from "./ProposalSectionCardImageDisplay";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ProposalSectionCardProps {
  block: ProposalBlock;
  onEdit: (block: ProposalBlock) => void;
  onRemove: (uuid: string) => void;
  sortableId?: string;
}

export function ProposalSectionCard({ block, onEdit, onRemove, sortableId }: ProposalSectionCardProps) {
  // Enable sortable if sortableId is provided
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sortableId || block.uuid });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 50 : undefined,
    // Remove cursor: 'grab' from the card, keep it only on the handle
  };
  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="f-full p-4 pr-12 group relative min-h-[120px] cursor-text"

      aria-label={`Edit block ${block.title || 'Untitled'}`}
      {...attributes}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 p-0">
        {/* Drag handle on the left, absolutely positioned like the button group */}
        <div
          {...listeners}
          className="flex flex-col gap-1 absolute left-2 top-1/2 -translate-y-1/2 cursor-grab select-none text-muted-foreground hover:text-primary"
          aria-label="Drag to reorder"
          tabIndex={0}
          role="button"
          onClick={e => e.stopPropagation()}
        >
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex flex-col gap-1 ml-6">
          <CardTitle>
            {block.title || <span className="text-muted-foreground">Untitled</span>}
          </CardTitle>
          {block.description ? (
            <CardDescription>{block.description}</CardDescription>
          ) : (
            <CardDescription className="italic text-muted-foreground">No description</CardDescription>
          )}
          {block.image_uuids && block.image_uuids.length > 0 && (
            <ProposalSectionCardImageDisplay uuids={block.image_uuids} className="mt-2" />
          )}
        </div>
        <DefaultCardActions<ProposalBlock> item={block} onEdit={onEdit} onRemove={onRemove} />
      </CardHeader>
    </Card>
  );
}
