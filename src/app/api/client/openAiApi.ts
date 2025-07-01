import type { OpenAIRequest, OpenAIResponse } from '@/types/openai';

/**
 * Calls the OpenAI API via your backend and returns the response.
 * @param payload - The OpenAI request payload
 * @returns The OpenAI response
 */
export async function getResponse(payload: OpenAIRequest): Promise<OpenAIResponse> {
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to get OpenAI response: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
