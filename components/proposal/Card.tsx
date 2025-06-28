"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeclineDialog } from "./DeclineDialog";
import { Clock, Check, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface ProposalCardProps {
  imageUrl: string;
  alt: string;
  days: number;
  title: string;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ imageUrl, alt, days, title }) => {
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="p-0">
          <div className="relative w-full h-56 rounded-t-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={alt}
              className="object-cover w-full h-full"
              loading="lazy"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <Badge className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1 bg-white text-black text-base shadow">
              <Clock className="size-5 mr-1 text-black" aria-hidden="true" />
              {days} days
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <CardTitle className="text-lg text-left">
            {title}
          </CardTitle>
        </CardContent>
        <div className="w-full px-6 pb-6 flex flex-col gap-2 sm:flex-row sm:gap-4 sm:justify-between">
          <Button
            variant="default"
            className="flex-1 flex items-center justify-center gap-2 bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] hover:bg-[hsl(142,71%,35%)] focus-visible:bg-[hsl(142,71%,35%)] transition-colors"
            aria-label="Accept"
          >
            <Check className="size-5" />
            Accept
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
            aria-label="Decline"
            onClick={() => setShowDeclineDialog(true)}
          >
            <X className="size-5" />
            Decline
          </Button>
        </div>
      </Card>
      {showDeclineDialog && (
        <DeclineDialog onClose={() => setShowDeclineDialog(false)} />
      )}
    </>
  );
};
