import type { ProposalBlock } from '@/types/proposal';
import type { CreateContentRequest } from '@/types/content';
import type { ContentImage } from '@/types/content';
import { uploadcareCareUuidsToContentImage } from './uploadcareCareUuidsToContentImage';

/**
 * Transforms a ProposalBlock into a CreateContentRequest for content creation.
 * Fetches full ContentImage info for each Uploadcare UUID if provided.
 * @param block - ProposalBlock to transform
 * @param companyId - The company ID for the content library
 * @returns Promise<CreateContentRequest> object
 */
export async function transformProposalBlockToContentRequest(
  block: ProposalBlock,
  companyId: number
): Promise<CreateContentRequest> {
  let images: ContentImage[] | undefined = undefined;
  if (block.image_uuids?.length) {
    images = await uploadcareCareUuidsToContentImage(block.image_uuids);
  }
  return {
    company_id: companyId,
    language: block.language,
    title: block.title || '',
    description: block.description,
    images,
  };
}

