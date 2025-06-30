import { createPreviewHtml } from './createPreviewHtml';

/**
 * Returns sanitized HTML for the sample proposal.
 */
import type { CreateProposalRequest } from "@/types/proposal";
import type { Company } from "@/types/company";

export async function getProposalPreview(data?: CreateProposalRequest, company?: Company): Promise<string> {
  return createPreviewHtml(data, company);
}

