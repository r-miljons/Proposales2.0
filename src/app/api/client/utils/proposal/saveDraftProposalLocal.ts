import type { CreateProposalRequest } from "@/types/proposal";
import type { ServerProposalSaveStatus } from '@/types/server-proposal-save-status';
import { DRAFT_KEY } from "@/app/api/client/config/keyLocations";
import { updateServerProposalSaveStatus } from './updateProposalServerSaveStatus';

export function saveDraftProposalLocal(draft: CreateProposalRequest | null) {
  // Dispatches a custom event after saving/removing draft to notify listeners in all tabs and the same tab

  if (typeof window === "undefined") return;
  if (draft) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    window.dispatchEvent(new CustomEvent('proposal-localstorage-changed'));
    // Also set isSaved: false in ServerProposalSaveStatus
    // To ensure that the UI doesn't show that the proposal is saved
    updateServerProposalSaveStatus({ isSaved: false });
  } else {
    localStorage.removeItem(DRAFT_KEY);
    window.dispatchEvent(new CustomEvent('proposal-localstorage-changed'));
  }
}
