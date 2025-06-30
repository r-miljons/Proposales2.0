import type { ProposalBlock } from '@/types/proposal';
import type { CreateContentRequest } from '@/types/content';
import type { ContentImage } from '@/types/content';

/**
 * Transforms a ProposalBlock into a CreateContentRequest for content creation.
 * @param block - ProposalBlock to transform
 * @param companyId - The company ID for the content library
 * @returns CreateContentRequest object
 */
export function transformProposalBlockToContentRequest(
  block: ProposalBlock,
  companyId: number
): CreateContentRequest {
  // Map ProposalBlock fields to CreateContentRequest fields
  return {
    company_id: companyId,
    language: block.language,
    title: block.title || '',
    description: block.description,
    images: block.image_uuids?.length
      ? block.image_uuids.map((uuid): ContentImage => ({ uuid }))
      : undefined,
  };
}
