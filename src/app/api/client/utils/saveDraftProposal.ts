import type { CreateProposalRequest } from "@/types/proposal";
import { DRAFT_KEY } from "@/app/api/client/config/keyLocations";

export function saveDraftProposal(draft: CreateProposalRequest | null) {
  if (typeof window === "undefined") return;
  if (draft) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } else {
    localStorage.removeItem(DRAFT_KEY);
  }
}
