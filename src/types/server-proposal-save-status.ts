import type { CreateProposalResponse } from './proposal';

export interface ServerProposalSaveStatus {
  isSaved: boolean;
  proposal?: CreateProposalResponse;
}
