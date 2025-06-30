import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { Trash2 } from "lucide-react";

interface ImageDisplayCardProps {
  url: string;
  alt?: string;
  className?: string;
  onRemove?: () => void;
}

export function ImageDisplayCard({ url, alt = "Uploaded image", className, onRemove }: ImageDisplayCardProps) {
  return (
    <Card className={cn("w-24 h-24 overflow-hidden flex items-center justify-center relative group", className)}>
      <CardContent className="p-0 w-full h-full flex items-center justify-center">
        <Image
          src={url}
          alt={alt}
          width={96}
          height={96}
          className="object-cover w-full h-full rounded"
          loading="lazy"
        />
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove image"
            className="absolute top-1 right-1 z-10 p-1 rounded-full bg-background/80 hover:bg-destructive/90 text-destructive hover:text-white transition-opacity opacity-80 group-hover:opacity-100"
          >
            <Trash2 size={18} />
          </button>
        )}
      </CardContent>
    </Card>
  );
}
