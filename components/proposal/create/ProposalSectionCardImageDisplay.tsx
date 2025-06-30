import React from "react";
import Image from "next/image";
import { getUploadcareUrl } from "@/lib/uploadcareUrl";
import { cn } from "@/lib/utils";
import { TypographySmall } from "@/components/ui/Typography";

interface ProposalSectionCardImageDisplayProps {
  uuids: string[];
  className?: string;
}

/**
 * Displays up to 3 images (15x15px each) in a row, with a "+X more" label if there are more.
 */
export const ProposalSectionCardImageDisplay: React.FC<ProposalSectionCardImageDisplayProps> = ({ uuids, className }) => {
  const maxDisplay = 3;
  const displayUuids = uuids.slice(0, maxDisplay);
  const extraCount = uuids.length - maxDisplay;

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {displayUuids.map((uuid, idx) => (
        <Image
          key={uuid}
          src={getUploadcareUrl(uuid)}
          alt={`Image ${idx + 1}`}
          width={45}
          height={45}
          className="rounded object-cover border border-border bg-muted"
          style={{ minWidth: 45, minHeight: 45 }}
        />
      ))}
      {extraCount > 0 && (
        <TypographySmall className="pl-2 text-muted-foreground whitespace-nowrap">+{extraCount} more</TypographySmall>
      )}
    </div>
  );
};

export default ProposalSectionCardImageDisplay;
