/**
 * Removes undefined values from a headers object, returning a type-safe Record<string, string>.
 * Useful for fetch API requests where all header values must be strings.
 */
export function cleanHeaders(headers: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(headers).filter(([_, v]) => v !== undefined)
  ) as Record<string, string>;
}
