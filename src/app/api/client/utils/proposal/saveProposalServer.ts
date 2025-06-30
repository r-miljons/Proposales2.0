import type { CreateProposalRequest } from '@/types/proposal';
import type { ServerProposalSaveStatus } from '@/types/server-proposal-save-status';
import { saveDraftProposalLocal } from './saveDraftProposalLocal';
import { createProposal } from '../../proposalApi';
import { updateServerProposalSaveStatus } from './updateProposalServerSaveStatus';
import { getDraftProposalLocal } from './getDraftProposalLocal';
import { enrichProposalBlocksWithContentIds } from './enrichProposalBlocksWithContentIds';

/**
 * Saves a proposal draft locally and attempts to save it on the server.
 * Updates the server proposal save status in localStorage based on the outcome.
 * @param draft The proposal draft to save
 */
export async function saveServerProposal(draft?: CreateProposalRequest): Promise<void> {
  // Use provided draft or get from local storage
  const proposalDraft = draft ?? getDraftProposalLocal();
  if (!proposalDraft) {
    // No draft to save
    return;
  }

  // Save locally first
  saveDraftProposalLocal(proposalDraft);

  let status: ServerProposalSaveStatus = { isSaved: false };
  try {
    // Enrich proposal blocks with content ids before saving
    const updatedDraft = await enrichProposalBlocksWithContentIds(proposalDraft);
    const response = await createProposal(updatedDraft);
    // This ensures that the UI shows that the proposal is saved
    status = { isSaved: true, ...response };
  } catch (error) {
    // Optionally, log error or handle it
    status = { isSaved: false };
    console.error('Failed to save proposal:', error);
  }
  updateServerProposalSaveStatus(status);
}
