import type { CreateProposalRequest } from '@/types/proposal';
import type { SimplifiedProposalTextOnly } from '@/types/ai';

/**
 * Converts a CreateProposalRequest to a SimplifiedProposalTextOnly object.
 * Only maps fields that exist in both types.
 */
export function createProposalRequestToSimplified(
  req: CreateProposalRequest
): SimplifiedProposalTextOnly {
  return {
    title: req.title_md ?? "",
    intro: req.description_md ?? "",
    sections: Array.isArray(req.blocks) && req.blocks.length > 0
      ? req.blocks.map((block) => ({
          title: block.title ?? '',
          description: block.description ?? '',
        }))
      : [],
  };
}

/**
 * Converts a SimplifiedProposalTextOnly object to a CreateProposalRequest.
 * Only maps fields that exist in both types. Other fields are left undefined.
 * Optionally accepts a base object to merge additional fields.
 */
export function simplifiedProposalTextOnlyToCreateProposalRequest(
  simplified: SimplifiedProposalTextOnly,
  base?: Partial<CreateProposalRequest>
): CreateProposalRequest {
  return {
    ...base,
    title_md: simplified.title ?? '',
    description_md: simplified.intro ?? '',
    blocks: Array.isArray(simplified.sections) && simplified.sections?.length > 0
      ? simplified.sections.map((section) => ({
          title: section.title,
          description: section.description,
          type: 'product-block', // default type, adjust as needed
          language: base?.language ?? 'en', // fallback language
          uuid: '', // placeholder, should be set by caller if needed
        }))
      : [],
    language: base?.language ?? 'en', // ensure language is always a string
  };
}
