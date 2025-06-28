# Project `lib` and Utilities Structure

## Purpose of the `lib` Directory

The `lib` directory is used to store business logic and utility functions that are not directly tied to UI components. This keeps the codebase organized, maintainable, and encourages reusability.

### Why use `lib` for utilities?
- **Separation of concerns:** Keeps business logic out of UI components.
- **Reusability:** Functions in `lib` can be imported anywhere in the project (components, API routes, tests, etc.).
- **Testability:** Utilities are easy to test in isolation.
- **Organization:** Related logic can be grouped by domain (e.g., `lib/gift-card-value.ts`).

## Example: Gift Card Value Normalization

The function `normalizeGiftCardValue` in `lib/gift-card-value.ts` ensures that user-entered gift card values are:
- Divisible by 5
- At least 5
- At most 10,000
- Accepts both string and number input

**Related test file:** `lib/gift-card-value.test.ts` (using Jest)

## Best Practices
- Use `lib/` for domain/business logic and pure functions.
- Use `utils/` (if present) for generic helpers (e.g., string manipulation).
- Keep UI logic in `components/`.
- Keep API/server logic in `server/` or `api/` if needed.

---

**Summary:**
The `lib` directory is the recommended place for business logic and utilities in a Next.js/React project. This approach makes your codebase scalable and maintainable as it grows.
