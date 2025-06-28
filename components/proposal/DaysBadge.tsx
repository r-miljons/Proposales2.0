"use client";

import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import React from "react";

interface DaysBadgeProps {
  days: number;
}

/**
 * DaysBadge - A badge showing the number of days with a clock icon.
 * Absolutely positioned bottom-right, intended for use in card images.
 */
export const DaysBadge: React.FC<DaysBadgeProps> = ({ days }) => (
  <Badge className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1 bg-white text-black text-base shadow rounded-full">
    <Clock className="size-5 mr-1 text-black" aria-hidden="true" />
    {days} days
  </Badge>
);

export default DaysBadge;
