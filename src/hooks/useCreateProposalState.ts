import { useContext } from "react";
import { CreateProposalContext } from "@/components/providers/CreateProposalStateProvider";

export function useCreateProposalState() {
  const context = useContext(CreateProposalContext);
  if (!context) {
    throw new Error("useCreateProposalState must be used within a CreateProposalProvider");
  }
  return context;
}
