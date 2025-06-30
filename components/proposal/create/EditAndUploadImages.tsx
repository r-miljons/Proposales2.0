"use client";

import React from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { getUploadcareUrl } from "@/lib/uploadcareUrl";
import { SortableImageCard } from "./SortableImageCard";

interface EditAndUploadImagesProps {
  uuids: string[];
  onChange?: (uuids: string[]) => void;
  className?: string;
}

/**
 * Displays a grid of images using their Uploadcare UUIDs.
 * Each image is rendered via ImageDisplayCard using the Uploadcare CDN URL.
 */
import { FileUpload } from "@/components/ui/file-upload";

export function EditAndUploadImages({ uuids, onChange, className }: EditAndUploadImagesProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleRemove = (uuidToRemove: string) => {
    if (onChange) {
      onChange(uuids.filter((uuid) => uuid !== uuidToRemove));
    }
  };

  const handleAdd = (newUuids: string[]) => {
    if (onChange) {
      // Prevent duplicates
      const combined = [...uuids, ...newUuids.filter(uuid => !uuids.includes(uuid))];
      onChange(combined);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id && onChange) {
      const oldIndex = uuids.indexOf(active.id);
      const newIndex = uuids.indexOf(over.id);
      onChange(arrayMove(uuids, oldIndex, newIndex));
    }
  };

  return (
    <div className={className} suppressHydrationWarning>
      {onChange && (
        <div className="mb-4">
          <FileUpload onUploadComplete={handleAdd} accept="image/*" multiple />
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext items={uuids} strategy={rectSortingStrategy}>
          <div className="flex flex-wrap gap-2">
            {uuids.map((uuid) => (
              <SortableImageCard
                key={uuid}
                uuid={uuid}
                url={getUploadcareUrl(uuid)}
                onRemove={onChange ? () => handleRemove(uuid) : undefined}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
