import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

import { CreateProposalRequest } from "@/types/proposal";
import { getDraftProposal } from "@/app/api/client/utils/getDraftProposal";
import { saveDraftProposal } from "@/app/api/client/utils/saveDraftProposal";

// Define the shape of the state
export interface CreateProposalState {
  proposal: CreateProposalRequest;
}

export interface CreateProposalStateContext {
  state: CreateProposalState;
  setState: Dispatch<SetStateAction<CreateProposalState>>;
}

export const CreateProposalContext = createContext<CreateProposalStateContext | undefined>(undefined);


interface CreateProposalProviderProps {
  children: ReactNode;
  initialProposal: CreateProposalRequest;
}

export const CreateProposalProvider = ({ children, initialProposal }: CreateProposalProviderProps) => {
  const [state, setState] = useState<CreateProposalState>(() => {
    // Try to get draft from localStorage first
    const draft = getDraftProposal();
    return { proposal: draft ?? initialProposal };
  });

  // Sync state changes to localStorage
  useEffect(() => {
    saveDraftProposal(state.proposal);
  }, [state.proposal]);

  return (
    <CreateProposalContext.Provider value={{ state, setState }}>
      {children}
    </CreateProposalContext.Provider>
  );
};

