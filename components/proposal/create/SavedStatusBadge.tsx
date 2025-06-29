import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info, Check } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { useServerProposalSaveStatus } from '@/hooks/useServerProposalSaveStatus';

const SavedStatusBadge: React.FC = () => {
  const status = useServerProposalSaveStatus();
  const isSaved = status?.isSaved;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          className={`flex items-center gap-1 px-2 md:px-4 py-2 border rounded-md text-xs select-none h-auto min-w-0
            ${isSaved
              ? 'bg-success text-success-foreground border-success hover:bg-success hover:text-success-foreground hover:border-success'
              : 'text-muted-foreground bg-transparent hover:bg-transparent hover:text-muted-foreground hover:border-inherit'}
          `}
          tabIndex={-1}
          type="button"
          aria-hidden="true"
        >
          {isSaved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Info className="w-4 h-4" />
          )}
          <span className="hidden md:inline">
            {isSaved ? 'All Changes Saved' : 'Unsaved Changes'}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8} className="md:hidden">
        {isSaved ? 'All Changes Saved' : 'Unsaved Changes'}
      </TooltipContent>
    </Tooltip>
  );
};


export default SavedStatusBadge;
