"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProposalSectionCard } from "./ProposalSectionCard";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SectionEditorDialog } from "./SectionEditorDialog";
import type { ProposalBlock } from "@/types/proposal";
import { getDefaultBlock } from "@/lib/getDefaultBlock";

interface ProposalSectionsListProps {
  blocks: ProposalBlock[];
  onBlocksChange?: (blocks: ProposalBlock[]) => void;
}

export function ProposalSectionsList({ blocks, onBlocksChange }: ProposalSectionsListProps) {
  // Local state for drag-and-drop ordering
  const [localBlocks, setLocalBlocks] = React.useState<ProposalBlock[]>(blocks);
  React.useEffect(() => {
    setLocalBlocks(blocks);
  }, [blocks]);
  const [open, setOpen] = React.useState(false);
  const [editingBlock, setEditingBlock] = React.useState<ProposalBlock | null>(null);

  // Handler to add or edit a block
  const handleBlockChange = (newBlock: ProposalBlock) => {
    if (!onBlocksChange) return;
    if (editingBlock) {
      // Edit mode: replace block with matching uuid
      const newBlocks = blocks.map(block =>
        block.uuid === editingBlock.uuid ? newBlock : block
      );
      onBlocksChange(newBlocks);
    } else {
      // Add mode: append
      const newBlocks = [...blocks, newBlock];
      onBlocksChange(newBlocks);
    }
    setEditingBlock(null);
    setOpen(false);
  };

  const handleRemoveBlock = (uuid: string) => {
    if (!onBlocksChange) return;
    const newBlocks = blocks.filter(block => block.uuid !== uuid);
    onBlocksChange(newBlocks);
  };

  const handleEditBlock = (block: ProposalBlock) => {
    setEditingBlock(block);
    setOpen(true);
  };

  const handleAddBlock = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditingBlock(null);
    setOpen(true);
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = localBlocks.findIndex(b => b.uuid === active.id);
    const newIndex = localBlocks.findIndex(b => b.uuid === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const newBlocks = arrayMove(localBlocks, oldIndex, newIndex);
    setLocalBlocks(newBlocks);
    if (onBlocksChange) onBlocksChange(newBlocks);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex w-full gap-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleAddBlock}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Section
        </Button>
        <SectionEditorDialog
          open={open}
          block={editingBlock ?? getDefaultBlock()}
          onOpenChange={(open) => {
            setOpen(open);
            if (!open) setEditingBlock(null);
          }}
          onBlockChange={handleBlockChange}
        />
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext
          items={localBlocks.map(b => b.uuid)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-4">
            {localBlocks.map((block) => (
              <ProposalSectionCard
                key={block.uuid}
                block={block}
                onEdit={handleEditBlock}
                onRemove={handleRemoveBlock}
                sortableId={block.uuid}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

