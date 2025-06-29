"use client"

import * as React from "react"
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from "lucide-react"

import { NavUser } from "@/components/company/nav-user"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Header } from "../../headers"
import { ThemeToggle } from "../../ui/ThemeToggle"
import { SiteLogo } from "../../ui/site-logo"
import { Separator } from "@/components/ui/separator"
import { FileUpload } from "@/components/ui/file-upload";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


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
        <SidebarContent>
          <div className="p-4">
            <FileUpload />
          </div>
        </SidebarContent>  
        <SidebarFooter>
        <NavUser />
        </SidebarFooter>

    </Sidebar>
  )
}
