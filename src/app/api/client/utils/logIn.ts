import type { AuthData } from '@/types/auth';
import { saveAuth } from './saveAuth';
import { getDraftProposalLocal } from './getDraftProposalLocal';
import { saveDraftProposalLocal } from './saveDraftProposalLocal';
import { updateServerProposalSaveStatus } from './updateServerProposalSaveStatus';

export function logIn(authData: AuthData): void {
  // Always set isSaved: false for server proposal save status on log in
  // To ensure that the UI doesn't show that the proposal is saved
  if (typeof window !== 'undefined') {
    updateServerProposalSaveStatus({ isSaved: false });
  }
  saveAuth(authData);
  // If there's a local draft, update its company_id to match the logged-in company
  if (authData.company && authData.company.id) {
    const draft = getDraftProposalLocal();
    if (draft) {
      const updatedDraft = { ...draft, company_id: authData.company.id };
      saveDraftProposalLocal(updatedDraft);
    }
  }
}
