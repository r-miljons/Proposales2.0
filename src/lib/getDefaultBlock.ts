import type { ProposalBlock } from "@/types/proposal";
import { v4 as uuid } from "uuid";

/**
 * Returns a default ProposalBlock object, optionally merging with overrides.
 * @param overrides Optional partial ProposalBlock to override defaults.
 */
export function getDefaultBlock(overrides?: Partial<ProposalBlock>): ProposalBlock {
  return {
    title: '',
    description: '',
    language: 'en',
    type: 'product-block',
    uuid: uuid(),
    ...(overrides ?? {})
  };
}
