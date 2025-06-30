import type { ServerProposalSaveStatus } from '@/types/server-proposal-save-status';
import { SERVER_PROPOSAL_SAVE_STATUS_KEY } from '@/app/api/client/config/keyLocations';

// This is used to show in the UI if the proposal is saved in the server (sent to proposales api)
export function updateServerProposalSaveStatus(status: ServerProposalSaveStatus): void {
  if (typeof window === 'undefined') return;
  try {
    const value = JSON.stringify(status);
    localStorage.setItem(SERVER_PROPOSAL_SAVE_STATUS_KEY, value);
    window.dispatchEvent(
      new CustomEvent('server-proposal-save-status-updated', {
        detail: { key: SERVER_PROPOSAL_SAVE_STATUS_KEY, value }
      })
    );
  } catch {
    // Optionally, handle errors (e.g., quota exceeded)
  }
}
