import type { CreateProposalRequest } from '@/types/proposal';
import { v4 as uuidv4 } from 'uuid';

/**
 * Merges two CreateProposalRequest objects.
 * - For top-level fields, values from override take precedence if present.
 * - For arrays (like blocks, attachments), merges by index, preferring override values but preserving original UUIDs and non-empty fields.
 * - Does not overwrite original UUIDs or other unique identifiers unless explicitly present in override.
 * - Use this function to safely combine user-edited and AI-generated proposals.
 */
export function mergeTwoProposalRequests(
  original: CreateProposalRequest,
  override: Partial<CreateProposalRequest>
): CreateProposalRequest {
  return {
    ...original,
    ...override,
    // Merge blocks array carefully
    blocks: mergeBlocks(original.blocks, override.blocks),
    // Merge attachments array if needed (default: override or original)
    attachments: override.attachments ?? original.attachments,
  };
}

function mergeBlocks(
  originalBlocks?: CreateProposalRequest['blocks'],
  overrideBlocks?: CreateProposalRequest['blocks']
): CreateProposalRequest['blocks'] {
  /**
   * The merged array will always have the same length as overrideBlocks (if provided).
   * Each overrideBlock is merged with the originalBlock at the same index (if present).
   * If overrideBlocks has more blocks than originalBlocks, extra overrideBlocks are included as-is (with uuid logic).
   * If overrideBlocks has fewer blocks, extra originalBlocks are ignored.
   */
  if (!originalBlocks && !overrideBlocks) return undefined;
  if (!overrideBlocks) return originalBlocks;
  if (!originalBlocks) return overrideBlocks;
  return overrideBlocks.map((overrideBlock, i) => {
    const origBlock = originalBlocks[i];
    // If no original block at this index, still ensure uuid is present
    if (!origBlock) {
      return {
        ...overrideBlock,
        uuid: overrideBlock.uuid || uuidv4(),
      };
    }
    return {
      ...origBlock,
      ...overrideBlock,
      uuid: overrideBlock.uuid || origBlock.uuid || uuidv4(), // preserve original uuid, or generate if missing
      // You can add more careful merging for other fields here if needed
    };
  });
}
