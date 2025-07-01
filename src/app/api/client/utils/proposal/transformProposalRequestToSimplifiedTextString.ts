import type { CreateProposalRequest } from '@/types/proposal';
import { createProposalRequestToSimplified } from './translateBetweenSimplifiedProposalTextOnlyAndProposalRequest';

/**
 * Transforms a CreateProposalRequest into a readable, labeled text document string.
 * Headings and sections are included for clarity, suitable for AI or human review.
 */
export function transformProposalRequestToSimplifiedTextString(
  req: CreateProposalRequest
): string {
  const simplified = createProposalRequestToSimplified(req);
  let doc = '';
  const hasTitle = Boolean(simplified.title);
  const hasIntro = Boolean(simplified.intro);
  const hasSections = Array.isArray(simplified.sections) && simplified.sections.length > 0;

  if (!hasTitle && !hasIntro && !hasSections) {
    return "Currently no proposal data is available, feel free to create from scratch";
  }

  if (simplified.title) {
    doc += `# Title\n${simplified.title}\n\n`;
  }
  if (simplified.intro) {
    doc += `# Introduction\n${simplified.intro}\n\n`;
  }
  if (simplified.sections && simplified.sections.length > 0) {
    doc += `# Sections\n`;
    simplified.sections.forEach((section, idx) => {
      doc += `\n## Section ${idx + 1}`;
      if (section.title) {
        doc += `\n### Title\n${section.title}`;
      }
      if (section.description) {
        doc += `\n### Description\n${section.description}`;
      }
      doc += '\n';
    });
  }
  return doc.trim();
}
