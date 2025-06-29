"use client";

import { CreateProposalSidebar } from "@/components/proposal/create/CreateProposalSidebar"
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
  SidebarProvider,
} from "@/components/ui/sidebar"
import CreateProposalMainSection from "@/components/proposal/create/CreateProposalMainSection";

import { CreateProposalProvider } from "@/components/providers/CreateProposalStateProvider";
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
        <CreateProposalSidebar />
        <CreateProposalMainSection />
      </SidebarProvider>
    </CreateProposalProvider>
  );
}
