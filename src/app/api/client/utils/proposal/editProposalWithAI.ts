import type { CreateProposalRequest } from '@/types/proposal';
import { transformProposalRequestToSimplifiedTextString } from './transformProposalRequestToSimplifiedTextString';
import { getProposalResponse } from '@/app/api/client/utils/ai/getProposalResponse';
import { simplifiedProposalTextOnlyToCreateProposalRequest } from './translateBetweenSimplifiedProposalTextOnlyAndProposalRequest';
import { mergeTwoProposalRequests } from './mergeTwoProposalRequests';

/**
 * Uses AI to edit a proposal request. Sends the proposal as a readable string to the AI,
 * receives a structured simplified output, converts it back to a proposal request, and merges edits.
 * @param proposal The original proposal request to edit
 * @returns The edited proposal request
 */
export async function editProposalWithAI(
  proposal: CreateProposalRequest,
  instructions: string
): Promise<CreateProposalRequest> {
  // 1. Format proposal as a readable document string
  const proposalText = transformProposalRequestToSimplifiedTextString(proposal);
  // 2. Craft the full instructions string to send to the AI
  const aiPrompt = `$Here are the instructions:\n${instructions}\n\n## Proposal To Edit:\n\n${proposalText}`;
  // 3. Get AI-edited proposal (structured)
  const aiResponse = await getProposalResponse(aiPrompt);
  // 4. Convert AI output to CreateProposalRequest
  const aiProposal = simplifiedProposalTextOnlyToCreateProposalRequest(
    aiResponse.output_parsed as import('@/types/ai').SimplifiedProposalTextOnly,
    proposal // use original as base for non-simplified fields
  );
  // 5. Merge original and AI-edited proposals, prioritizing AI changes
  return mergeTwoProposalRequests(proposal, aiProposal);
}
