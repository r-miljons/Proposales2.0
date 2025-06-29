import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import React from "react";

const SavedStatusBadge: React.FC = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span
  className="flex items-center gap-1 px-2 md:px-4 py-2 border rounded-md text-xs text-muted-foreground bg-transparent select-none pointer-events-none"
  aria-hidden="true"
>
        <Info className="w-4 h-4" />
        <span className="hidden md:inline">Unsaved Changes</span>
      </span>
    </TooltipTrigger>
    <TooltipContent side="bottom" sideOffset={8} className="md:hidden">
      Unsaved Changes
    </TooltipContent>
  </Tooltip>
);


export default SavedStatusBadge;
