/**
 * Constructs a public Uploadcare CDN URL from a UUID.
 * @param uuid - The Uploadcare file UUID
 * @returns The public CDN URL for the file
 */
export function getUploadcareUrl(uuid: string): string {
  return `https://ucarecdn.com/${uuid}/`;
}
