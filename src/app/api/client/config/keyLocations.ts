// localStorage key for auth data
export const AUTH_KEY = 'proposales_vision_demo_project_auth';

// localStorage key for draft proposal
export const DRAFT_KEY = 'proposales_vision_demo_project_draft_proposal';

// localStorage key for the status of the proposal save on the proposales server (has it been successfully sent to the server?)
export const SERVER_PROPOSAL_SAVE_STATUS_KEY = 'proposales_vision_demo_project_server_proposal_save_status';

// OpenAI API key
export const OPENAI_API_KEY = process.env.NEXT_OPENAI_API_KEY;

// Uploadcare public key from .env (required for Uploadcare uploads)
export const UPLOADCARE_PUB_API_KEY = process.env.NEXT_UPLOADCARE_PUB_API_KEY!;