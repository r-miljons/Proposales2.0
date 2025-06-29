import type { CreateProposalRequest } from "@/types/proposal";
import { DRAFT_KEY } from "@/app/api/client/config/keyLocations";

export function getDraftProposal(): CreateProposalRequest | null {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(DRAFT_KEY);
  if (!item) return null;
  try {
    return JSON.parse(item) as CreateProposalRequest;
  } catch {
    return null;
  }
}
