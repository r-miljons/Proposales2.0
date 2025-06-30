import type { savedProposalResponse } from './proposal';

export interface ServerProposalSaveStatus {
  isSaved: boolean;
  proposal?: savedProposalResponse;
}
