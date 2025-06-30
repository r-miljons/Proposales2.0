import type { CreateProposalRequest, CreateProposalResponse } from '@/types/proposal';
import { addAuthHeader } from '@/app/api/client/utils/auth/addAuthHeader';

export async function createProposal(payload: CreateProposalRequest): Promise<CreateProposalResponse> {
  const response = await fetch('/api/proposals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...addAuthHeader(),
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to create proposal: ${response.status} ${response.statusText}`);
  }
  const result = await response.json();
  // If the external API returns a .data property, use it; otherwise, return the whole result.
  return result.data ? (result.data as CreateProposalResponse) : (result as CreateProposalResponse);
}
