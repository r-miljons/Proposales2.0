import { z } from "zod";

// Zod schema for a single proposal section (required fields)
export const simplifiedProposalSectionTextOnly = z.object({
  title: z.string(),
  description: z.string(),
});

// Zod schema for the proposal (optional fields)
export const simplifiedProposalTextOnly = z.object({
  title: z.string().optional(),
  intro: z.string().optional(),
  sections: z.array(simplifiedProposalSectionTextOnly).optional(),
});

export type SimplifiedProposalSectionTextOnly = z.infer<typeof simplifiedProposalSectionTextOnly>;
export type SimplifiedProposalTextOnly = z.infer<typeof simplifiedProposalTextOnly>;
