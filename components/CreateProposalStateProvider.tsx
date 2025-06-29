import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { CreateProposalRequest } from "@/types/proposal";

// Define the shape of the state
interface CreateProposalState {
  proposal: CreateProposalRequest;
}

interface CreateProposalStateContext {
  state: CreateProposalState;
  setState: Dispatch<SetStateAction<CreateProposalState>>;
}

const CreateProposalContext = createContext<CreateProposalStateContext | undefined>(undefined);

interface CreateProposalProviderProps {
  children: ReactNode;
  initialProposal: CreateProposalRequest;
}

export const CreateProposalProvider = ({ children, initialProposal }: CreateProposalProviderProps) => {
  const [state, setState] = useState<CreateProposalState>({ proposal: initialProposal });
  return (
    <CreateProposalContext.Provider value={{ state, setState }}>
      {children}
    </CreateProposalContext.Provider>
  );
};

export function useCreateProposalState() {
  const context = useContext(CreateProposalContext);
  if (!context) {
    throw new Error("useCreateProposalState must be used within a CreateProposalProvider");
  }
  return context;
}
