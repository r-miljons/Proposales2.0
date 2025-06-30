import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageDisplayCardProps {
  url: string;
  alt?: string;
  className?: string;
}

export function ImageDisplayCard({ url, alt = "Uploaded image", className }: ImageDisplayCardProps) {
  return (
    <Card className={cn("w-24 h-24 overflow-hidden flex items-center justify-center", className)}>
      <CardContent className="p-0 w-full h-full flex items-center justify-center">
        <Image
          src={url}
          alt={alt}
          className="object-cover w-full h-full rounded"
          loading="lazy"
        />
      </CardContent>
    </Card>
  );
}
