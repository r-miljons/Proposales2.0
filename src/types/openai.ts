// Type definitions for OpenAI API usage in the project

export interface OpenAIResponse {
  output_text: string;
  output_parsed?: unknown; // Structured output if returned by the API
}

export type OpenAIChatRole = "system" | "user" | "assistant";
export interface OpenAIChatMessage {
  role: OpenAIChatRole;
  content: string;
  // Add more fields here if required by the OpenAI SDK
}

export interface OpenAIRequest {
  model: string;
  instructions?: string;
  input: string | OpenAIChatMessage[];
  /**
   * Used to request structured output from the API. The value should match a supported schema name on the backend,
   * which will be mapped to a Zod schema for validation and parsing of the AI's response.
   * Example: 'simplifiedProposalTextOnly'
   */
  responseType?: import('./ai').ResponseType;
}