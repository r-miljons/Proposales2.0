import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

import { CreateProposalRequest } from "@/types/proposal";
import { getDraftProposalLocal } from "@/app/api/client/utils/proposal/getDraftProposalLocal";
import isEqual from 'lodash.isequal';
import { saveDraftProposalLocal } from "@/app/api/client/utils/proposal/saveDraftProposalLocal";
import { DRAFT_KEY } from "@/app/api/client/config/keyLocations";

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
    const draft = getDraftProposalLocal();
    return { proposal: draft ?? initialProposal };
  });

  // Sync state changes to localStorage
  useEffect(() => {
    saveDraftProposalLocal(state.proposal);
  }, [state.proposal]);

  // Listen for changes to the proposal draft in localStorage (from this or other tabs)
  useEffect(() => {
    const handleStorageOrCustomEvent = (event: StorageEvent | Event) => {
      // For storage event, check the key
      if (
        (event instanceof StorageEvent && event.key === DRAFT_KEY) ||
        event.type === 'proposal-localstorage-changed'
      ) {
        const draft = getDraftProposalLocal();
        setState((prev) => {
          if (isEqual(prev.proposal, draft ?? initialProposal)) {
            return prev; // No change, so don't update state
          }
          return { ...prev, proposal: draft ?? initialProposal };
        });
      }
    };
    window.addEventListener('storage', handleStorageOrCustomEvent);
    window.addEventListener('proposal-localstorage-changed', handleStorageOrCustomEvent);
    return () => {
      window.removeEventListener('storage', handleStorageOrCustomEvent);
      window.removeEventListener('proposal-localstorage-changed', handleStorageOrCustomEvent);
    };
  }, [initialProposal]);

  return (
    <CreateProposalContext.Provider value={{ state, setState }}>
      {children}
    </CreateProposalContext.Provider>
  );
};

