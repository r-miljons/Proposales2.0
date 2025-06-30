
import React, { useEffect, useState } from "react";
import PreviewIframe from "./PreviewIframe";
import { useCreateProposalState } from "@/hooks/useCreateProposalState";
import type { CreateProposalRequest } from "@/types/proposal";

import { getAuth } from "@/app/api/client/utils/auth/getAuth";
import type { Company } from "@/types/company";

const fetchProposalPreview = async (proposal: CreateProposalRequest, company?: Company): Promise<string> => {
  const res = await fetch("/api/proposal-preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...proposal, company }),
  });
  if (!res.ok) throw new Error("Failed to fetch proposal preview");
  return res.text();
};

const ProposalPreview: React.FC = () => {
  const { state } = useCreateProposalState();

  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!state?.proposal) return;
    const auth = getAuth();
    const company = auth?.company;
    fetchProposalPreview(state.proposal, company)
      .then(setHtml)
      .catch((e) => setError(e.message));
  }, [state?.proposal]);

  if (error) {
    return <div className="text-destructive">Error: {error}</div>;
  }

  return (
    <div className="w-full h-full min-h-[calc(100vh-105px)] rounded-lg border overflow-hidden bg-white">
      <PreviewIframe html={html} />
    </div>
  );
};

export default ProposalPreview;
