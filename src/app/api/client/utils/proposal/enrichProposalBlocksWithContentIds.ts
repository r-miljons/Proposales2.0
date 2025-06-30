import type { CreateProposalRequest, ProposalBlock } from '@/types/proposal';
import { proposalBlockToContentIds } from '@/app/api/client/utils/content/proposalBlockToContentIds';

/**
 * Enriches the blocks of a CreateProposalRequest by ensuring each ProposalBlock has a content_id.
 * Calls proposalBlockToContentIds for blocks missing content_id and sets it from the response.
 * Returns a new CreateProposalRequest with updated blocks.
 */
export async function enrichProposalBlocksWithContentIds(
  draft: CreateProposalRequest
): Promise<CreateProposalRequest> {
  if (!draft.blocks || !draft.company_id) return draft;

  const updatedBlocks: ProposalBlock[] = await Promise.all(
    draft.blocks.map(async (block) => {
      if (!block.content_id) {
        const contentResp = await proposalBlockToContentIds(block, draft.company_id!);
        return { ...block, content_id: contentResp.data.variation_id };
      }
      return block;
    })
  );

  return {
    ...draft,
    blocks: updatedBlocks,
  };
}
