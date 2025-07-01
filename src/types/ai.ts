import { z } from "zod";

// Zod schema for a single proposal section (required fields)
export const simplifiedProposalSectionTextOnly = z.object({
  title: z.string(),
  description: z.string(),
});

// Zod schema for the proposal (optional fields)
export const simplifiedProposalTextOnly = z.object({
  title: z.string(),
  intro: z.string(),
  sections: z.array(simplifiedProposalSectionTextOnly),
});

// TypeScript types inferred from Zod schemas
export type SimplifiedProposalSectionTextOnly = z.infer<typeof simplifiedProposalSectionTextOnly>;
export type SimplifiedProposalTextOnly = z.infer<typeof simplifiedProposalTextOnly>;

/**
 * All supported responseType strings for OpenAI structured output.
 * Extend this union as you add more schemas.
 */
export type ResponseType = 'simplifiedProposalTextOnly';
