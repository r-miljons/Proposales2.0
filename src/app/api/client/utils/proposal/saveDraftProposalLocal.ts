import type { CreateProposalRequest } from "@/types/proposal";
import type { ServerProposalSaveStatus } from '@/types/server-proposal-save-status';
import { DRAFT_KEY } from "@/app/api/client/config/keyLocations";
import { updateServerProposalSaveStatus } from './updateProposalServerSaveStatus';

export function saveDraftProposalLocal(draft: CreateProposalRequest | null) {
  if (typeof window === "undefined") return;
  if (draft) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    // Also set isSaved: false in ServerProposalSaveStatus
    // To ensure that the UI doesn't show that the proposal is saved
    updateServerProposalSaveStatus({ isSaved: false });
  } else {
    localStorage.removeItem(DRAFT_KEY);
  }
}
