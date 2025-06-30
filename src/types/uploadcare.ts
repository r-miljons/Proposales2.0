// Types for Uploadcare direct upload

/**
 * Uploadcare direct upload request payload (multipart/form-data)
 */
export type UploadcareStoreValue = '0' | '1' | 'auto';
export const UPLOADCARE_STORE_VALUES: UploadcareStoreValue[] = ['0', '1', 'auto'];

export interface UploadcareDirectUploadPayload {
  UPLOADCARE_PUB_KEY: string;
  UPLOADCARE_STORE?: UploadcareStoreValue;
  /** File(s) to upload. Key must be `file` for single, or `files[]` for multiple. */
  file: File | Blob;
  /** Optional arbitrary metadata */
  metadata?: Record<string, string>;
  /** Expiry for signed uploads (optional, UNIX timestamp) */
  expire?: number;
}

/**
 * Uploadcare direct upload response
 */
export interface UploadcareDirectUploadResponse {
  file: string; // UUID
}

/**
 * Uploadcare file info response type
 * Only includes fields present in ContentImage, but allows additional fields
 */
export interface UploadcareImageInfo {
  height?: number;
  width?: number;
  [key: string]: unknown;
}

export interface UploadcareFileInfo {
  uuid: string;
  filename?: string;
  mime_type?: string;
  size?: number;
  image_info?: UploadcareImageInfo;
  [key: string]: unknown; // Allow additional fields from Uploadcare
}
