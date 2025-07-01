import type { OpenAIResponse } from '@/types/openai';
import { getResponse } from '@/app/api/client/openAiApi';
import type { ResponseType } from '@/types/ai';

/**
 * Calls the OpenAI API to generate a proposal using the GPT-4.1 model.
 * @param input - The user input or context for the proposal
 * @returns The OpenAI response containing the generated proposal
 */
export async function getProposalResponse(input: string): Promise<OpenAIResponse> {
  const responseType: ResponseType = 'simplifiedProposalTextOnly';
  return getResponse({
    model: 'gpt-4.1',
    instructions: 'Create a professional proposal based on the provided input. The user may use markdown to format the proposal, but your response should be in a structured format and values should not use markdown.',
    input,
    responseType,
  });
}
