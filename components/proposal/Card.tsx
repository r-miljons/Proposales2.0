"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewProposalBadge } from "./NewProposalBadge";
import { DaysBadge } from "./DaysBadge";
import { Button } from "@/components/ui/button";
import { DeclineDialog } from "./DeclineDialog";
import { Clock, Check, X, Circle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

interface ProposalCardProps {
  imageUrl: string;
  alt: string;
  days: number;
  title: string;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ imageUrl, alt, days, title }) => {
  const router = useRouter();
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);


  const handleAccept = () => {
    router.push('/create');
  };


  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="p-0">
          <div className="relative w-full h-56 rounded-t-xl overflow-hidden">
            {/* New Proposal Badge */}
            <NewProposalBadge />
            <Image
              src={imageUrl}
              alt={alt}
              className="object-cover w-full h-full"
              loading="lazy"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <DaysBadge days={days} />
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
            onClick={handleAccept}
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
        <DeclineDialog 
          onClose={() => setShowDeclineDialog(false)}
          onAccept={() => handleAccept()}
        />
      )}
    </>
  );
};
