import React from "react";
import { Company } from "@/types/company";
import { Building2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CompanyCardProps {
  company: Company;
  isSelected?: boolean;
  onSelectionChange?: (selected: boolean) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  isSelected = false,
  onSelectionChange,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg border transition-colors cursor-pointer relative",
        isSelected ? "border-primary" : "border-border hover:border-primary/50"
      )}
      onClick={() => onSelectionChange && onSelectionChange(!isSelected)}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      data-testid="company-card"
    >
      <div className="flex-shrink-0">
        <Building2 className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-base text-foreground">
              {company.name} <span className="text-muted-foreground font-normal">({company.currency})</span>
            </div>
          </div>
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
  <Checkbox checked={isSelected} tabIndex={-1} aria-hidden className="pointer-events-none w-6 h-6" />
</span>
        </div>
        {company.registration_number && (
          <div className="text-sm text-muted-foreground mt-1">
            {company.registration_number}
          </div>
        )}
      </div>
    </div>
  );
};
