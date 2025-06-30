import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BadgeCheck, LogOut, Building } from "lucide-react";
import { AuthenticateDialog } from "@/components/auth/authenticate-dialog";
import { logOut } from "@/app/api/client/utils/auth/logOut";
import type { Company } from "@/types/company";
import React from "react";

interface CompanyDropdownMenuContentProps {
  company: Company;
  isMobile: boolean;
}

export const CompanyDropdownMenuContent: React.FC<CompanyDropdownMenuContentProps> = ({ company, isMobile }) => {
  const [reauthOpen, setReauthOpen] = React.useState(false);
  const handleReauthContinue = React.useCallback((apiKey: string) => {
    setReauthOpen(false);
    // You can add more logic here if needed
  }, []);

  return (
    <>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">
                <Building className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{company.name}</span>
              {company.registration_number && (
                <span className="truncate text-xs">{company.registration_number}</span>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => setReauthOpen(true)}>
            <BadgeCheck className="mr-2 h-4 w-4" />
            <span>Reauthorize</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            logOut();
            window.location.reload();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <AuthenticateDialog
        open={reauthOpen}
        onOpenChange={setReauthOpen}
        onContinue={handleReauthContinue}
      />
    </>
  );
};
