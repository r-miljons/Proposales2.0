import type { ProposalBlock } from '@/types/proposal';
import type { CreateContentResponse } from '@/types/content';
import { transformProposalBlockToContentRequest } from './transformProposalBlockToContentRequest';
import { saveContentServer } from './saveContentServer';

/**
 * Accepts a ProposalBlock and companyId, transforms and saves as content, returning the content response.
 * @param block - The proposal block to save as content
 * @param companyId - The company ID for the content
 * @returns The CreateContentResponse from the server
 */
export async function proposalBlockToContentIds(
  block: ProposalBlock,
  companyId: number
): Promise<CreateContentResponse> {
  const contentRequest = await transformProposalBlockToContentRequest(block, companyId);
  return saveContentServer(contentRequest);
}
