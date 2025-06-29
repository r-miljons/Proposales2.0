"use client";

import { AppSidebar } from "@/components/proposal/create/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TypographySmall } from "@/components/ui/Typography"

import { CreateProposalProvider } from "@/components/CreateProposalStateProvider";
import { CreateProposalRequest } from "@/types/proposal";
import { getAuth } from "@/app/api/client/utils/getAuth";


export default function Page() {
  // company_id is fetched from auth if available, otherwise undefined
  const auth = typeof window !== "undefined" ? getAuth() : null;
  const initialProposal: CreateProposalRequest = {
    company_id: auth?.company?.id, // May be undefined
    language: "en", // Default language
  };


  return (
    <CreateProposalProvider initialProposal={initialProposal}>
      <SidebarProvider
        style={{
          "--sidebar-width": "350px",
        } as React.CSSProperties}
      >
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <TypographySmall>Preview</TypographySmall>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
              />
            ))}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </CreateProposalProvider>
  );
}
