"use client"

import * as React from "react"
import { NavUser } from "@/components/company/nav-user"
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "../../ui/ThemeToggle"
import { SiteLogo } from "../../ui/site-logo"
import { CreateProposalSidebarContent } from "./CreateProposalSidebarContent";
import { EditProposalWithAIButton } from "./EditProposalWithAIButton";

export function CreateProposalSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
        <SidebarHeader>
            <div className="flex justify-between p-2">
                <SiteLogo />
                <ThemeToggle />
            </div>
        </SidebarHeader>
        <CreateProposalSidebarContent />
        <SidebarFooter>
          <div className="w-full flex flex-col gap-3">
            <EditProposalWithAIButton />
            <NavUser />
          </div>
        </SidebarFooter>

    </Sidebar>
  )
}
