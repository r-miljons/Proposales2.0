"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import type { Company } from "@/types/company"
import { Building } from "lucide-react"

import { TypographyMuted } from "@/components/ui/Typography";
import { useEffect, useState } from "react";
import { getAuth } from "@/app/api/client/utils/getAuth";
import { CompanyDropdownMenuContent } from "@/components/company/CompanyDropdownMenuContent";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { AuthenticateDialog } from "@/components/auth/authenticate-dialog";

export function NavUser({
  company: companyProp,
}: {
  company?: Company
}) {
  const { isMobile } = useSidebar();
  const [company, setCompany] = useState<Company | undefined>(companyProp);

  useEffect(() => {
    if (!companyProp) {
      const auth = getAuth();
      if (auth && auth.company) {
        setCompany(auth.company);
      }
    }
  }, [companyProp]);

  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  if (!company) {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => setAuthDialogOpen(true)}
        >
          <LogIn className="h-5 w-5 text-info" />
          Login to save changes
        </Button>
        <AuthenticateDialog
          open={authDialogOpen}
          onOpenChange={setAuthDialogOpen}
          onContinue={() => {
            setAuthDialogOpen(false);
            window.location.reload();
          }}
        />
      </>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
            >
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
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <CompanyDropdownMenuContent company={company} isMobile={isMobile} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
