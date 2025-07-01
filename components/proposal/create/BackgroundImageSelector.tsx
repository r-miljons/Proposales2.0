"use client";

import * as React from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { ImageDisplayCard } from "@/components/ui/image-display-card";
import { TypographySmall } from "@/components/ui/Typography";
import { Label } from "@/components/ui/label";

import type { ProposalMedia } from "@/types/proposal";
import { getUploadcareUrl } from "@/lib/uploadcareUrl";

interface BackgroundImageSelectorProps {
  value: ProposalMedia | null;
  onChange: (value: ProposalMedia | null) => void;
  disabled?: boolean;
  label?: string;
}

function getBackgroundImageUrl(bg?: ProposalMedia | null): string | undefined {
  if (!bg) return undefined;
  if (typeof bg === "object" && bg.uuid) {
    return getUploadcareUrl(bg.uuid);
  }
  return undefined;
}

export function BackgroundImageSelector({ value, onChange, disabled = false, label }: BackgroundImageSelectorProps) {
  const [error, setError] = React.useState<string | null>(null);
  const imageUrl = getBackgroundImageUrl(value);

  const handleUploadComplete = React.useCallback((uuids: string[]) => {
    if (uuids.length > 0) {
      onChange({ uuid: uuids[0], id: Math.floor(10000 + Math.random() * 90000) }); // id: random 5-digit number, can be updated if API returns id
      setError(null);
    } else {
      setError("Upload failed. Please try again.");
    }
  }, [onChange]);

  const handleRemove = React.useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <div className="space-y-2">
      {label && <Label className="text-sm font-medium text-foreground">{label}</Label>}
      {imageUrl ? (
        <div className="flex items-center gap-2">
          <ImageDisplayCard url={imageUrl} alt="Background image" onRemove={disabled ? undefined : handleRemove} />
        </div>
      ) : (
        <FileUpload
          onUploadComplete={handleUploadComplete}
          accept="image/*"
          multiple={false}
          maxFiles={1}
          disabled={disabled}
        />
      )}
      {error && <TypographySmall className="text-destructive mt-2">{error}</TypographySmall>}
    </div>
  );
}
