"use client";

import { CreateProposalSidebar } from "@/components/proposal/create/CreateProposalSidebar"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import CreateProposalMainSection from "@/components/proposal/create/CreateProposalMainSection";

import { CreateProposalProvider } from "@/components/providers/CreateProposalStateProvider";
import { CreateProposalRequest } from "@/types/proposal";
import { getAuth } from "@/app/api/client/utils/auth/getAuth";
import { AuthProvider } from "@/components/providers/AuthProvider";


import React, { useEffect, useState } from "react";

export default function Page() {
  const auth = typeof window !== "undefined" ? getAuth() : null;
  const [initialProposal, setInitialProposal] = useState<CreateProposalRequest | null>(null);

  useEffect(() => {
    async function fetchInitialProposal() {
      try {
        const res = await fetch("/defaultProposal.json");
        const data = await res.json();
        setInitialProposal({ ...data, company_id: auth?.company?.id });
      } catch (error) {
        // fallback to minimal proposal if fetch fails
        setInitialProposal({ company_id: auth?.company?.id, language: "en" });
      }
    }
    fetchInitialProposal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.company?.id]);

  if (!initialProposal) return null;

  return (
    <AuthProvider initialAuth={auth}>
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
    </AuthProvider>
  );
}
