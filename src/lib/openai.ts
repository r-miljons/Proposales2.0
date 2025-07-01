import OpenAI from "openai";
import { OPENAI_API_KEY } from "@/app/api/client/config/keyLocations";

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables.");
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export default openai;
