import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ProposalBlock } from "@/types/proposal";
import { EditAndUploadImages } from "./EditAndUploadImages";

interface SectionFieldsProps {
  block: ProposalBlock;
  onChange: (field: keyof ProposalBlock, value: ProposalBlock[keyof ProposalBlock]) => void;
}

export function SectionFields({ block, onChange }: SectionFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="block-title">Title</Label>
        <Input
          id="block-title"
          value={block?.title || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('title', e.target.value)}
          placeholder="Enter section title"
          autoFocus
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="block-description">Description</Label>
        <Textarea
          id="block-description"
          value={block?.description || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange('description', e.target.value)}
          placeholder="Enter section description"
          rows={5}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="block-images">Images</Label>
          <EditAndUploadImages
            uuids={block.image_uuids ?? []}
            onChange={uuids => onChange('image_uuids', uuids)}
          />
      </div>
    </>
  );
}
