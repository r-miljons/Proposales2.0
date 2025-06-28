# API Client Utilities

This document explains the structure and usage of the API client utilities found in [`src/app/api/client`](../src/app/api/client).

## Overview
The `client` folder contains reusable utility functions for interacting with the project's public API server. It is designed for maintainability and separation of concerns, with each utility in its own file and a centralized base URL.

### Structure
- `baseUrl.ts`: Exports the central `API_BASE_URL` constant used by all API utilities.
- `fetchFromApi.ts`: Provides a function to make GET requests to the API.
- `sendToApi.ts`: Provides a function to make POST requests to the API.

## Usage Examples

### Fetching Data
```typescript
import { fetchFromApi } from '../../src/app/api';

async function getData() {
  const data = await fetchFromApi('your-endpoint');
  // handle data
}
```

### Sending Data
```typescript
import { sendToApi } from '../../src/app/api';

async function sendMessage(message: string) {
  const response = await sendToApi('messages', { message });
  // handle response
}
```

## Extending the API Client
To add more utilities, create a new file in `client/` and export your function. Update `src/app/api/index.ts` to re-export it for easy access.

---

For more details or advanced use cases, see the code comments in each utility file.
