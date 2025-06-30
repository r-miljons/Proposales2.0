"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ImageDisplayCard } from "@/components/ui/image-display-card";
import { GripVertical } from "lucide-react";

interface SortableImageCardProps {
  uuid: string;
  url: string;
  onRemove?: () => void;
}

export function SortableImageCard({ uuid, url, onRemove }: SortableImageCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: uuid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    // Remove cursor property from here
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative">
      <span
        {...listeners}
        className={
          `absolute left-1 top-1 z-20 p-1 rounded-full bg-background/80 hover:bg-muted/90 text-muted-foreground select-none ` +
          (isDragging ? "cursor-grabbing" : "cursor-grab")
        }
        aria-label="Drag to reorder"
      >
        <GripVertical size={18} />
      </span>
      <ImageDisplayCard url={url} onRemove={onRemove} />
    </div>
  );
}
