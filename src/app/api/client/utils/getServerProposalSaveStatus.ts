import type { ServerProposalSaveStatus } from '@/types/server-proposal-save-status';
import { SERVER_PROPOSAL_SAVE_STATUS_KEY } from '@/app/api/client/config/keyLocations';

// This is used to check if the proposal is saved in order to show it in the UI
export function getServerProposalSaveStatus(): ServerProposalSaveStatus | null {
  if (typeof window === 'undefined') return null;
  const item = localStorage.getItem(SERVER_PROPOSAL_SAVE_STATUS_KEY);
  if (!item) return null;
  try {
    return JSON.parse(item) as ServerProposalSaveStatus;
  } catch {
    return null;
  }
}
