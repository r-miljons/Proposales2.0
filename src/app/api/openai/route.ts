import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import type { OpenAIRequest, OpenAIResponse, OpenAIChatMessage } from '@/types/openai';

import { zodTextFormat } from "openai/helpers/zod";
import { simplifiedProposalTextOnly } from "@/app/api/client/utils/ai";
import type { ResponseType } from "@/types/ai";

// MODE_SWITCH: Set to true to use fallback schema-in-prompt mode, false for OpenAI structured output parsing
const USE_SCHEMA_IN_PROMPT_MODE = true;

export async function POST(req: NextRequest): Promise<NextResponse<OpenAIResponse>> {
  try {
    const body = (await req.json()) as OpenAIRequest;
    const { model, instructions, input, responseType } = body;

    let response;
    // Map responseType to a Zod schema
    if (responseType === 'simplifiedProposalTextOnly' as ResponseType) {
      // Debug: log the generated JSON schema for OpenAI
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { zodToJsonSchema } = require('zod-to-json-schema');
      const schemaJson = JSON.stringify(zodToJsonSchema(simplifiedProposalTextOnly, { name: "proposal" }), null, 2);
      console.log("Zod JSON Schema being sent:", schemaJson);
      if (USE_SCHEMA_IN_PROMPT_MODE) {
        // Fallback: append the schema to the input for the AI to see
        const inputWithSchema = `${Array.isArray(input) ? JSON.stringify(input) : input}\n\n---\n\nHere is the JSON schema you must follow for your response:\n${schemaJson}`;
        response = await openai.responses.create({
          model,
          instructions,
          input: inputWithSchema,
        });
        let output_parsed = undefined;
        try {
          // Try to parse and validate the AI response as JSON
          const parsed = JSON.parse(response.output_text);
          output_parsed = simplifiedProposalTextOnly.parse(parsed);
        } catch (e) {
          // Parsing or validation failed; output_parsed remains undefined
        }
        return NextResponse.json({
          output_text: response.output_text,
          ...(output_parsed && { output_parsed })
        });
      } else {
        // Default: use OpenAI structured output parsing
        response = await openai.responses.parse({
          model,
          input: Array.isArray(input) ? (input as OpenAIChatMessage[]) : input,
          text: {
            format: zodTextFormat(simplifiedProposalTextOnly, "proposal"),
          },
        });
        return NextResponse.json({
          output_text: response.output_text,
          output_parsed: response.output_parsed,
        });
      }
    } else {
      // Fallback to standard text completion
      response = await openai.responses.create({
        model,
        instructions,
        input,
      });
      return NextResponse.json({ output_text: response.output_text });
    }
  } catch (error: any) {
    return NextResponse.json(
      { output_text: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
