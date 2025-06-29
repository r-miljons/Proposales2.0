import { deleteAuth } from "./deleteAuth";
import type { ServerProposalSaveStatus } from '@/types/server-proposal-save-status';
import { getDraftProposalLocal } from "./getDraftProposalLocal";
import { saveDraftProposalLocal } from "./saveDraftProposalLocal";
import { updateServerProposalSaveStatus } from './updateServerProposalSaveStatus';

export function logOut() {
  deleteAuth();
  // Always set isSaved: false for server proposal save status on log out
  // To ensure that the UI doesn't show that the proposal is saved
  if (typeof window !== 'undefined') {
    updateServerProposalSaveStatus({ isSaved: false });
  }

  // since we are logging out company_id is no longer associated with any company.
  // we remove it from the draft to prevent any issues.
  const draft = getDraftProposalLocal();
  if (draft) {
    const updatedDraft = { ...draft, company_id: undefined };
    saveDraftProposalLocal(updatedDraft);
  }
}
