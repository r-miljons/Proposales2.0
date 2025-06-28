// Types for content API

export interface ContentImage {
  uuid: string;
  filename?: string;
  mime_type?: string;
  url?: string;
  size?: number;
  height?: number;
  width?: number;
}

// Asset type used in content listing (can be same as ContentImage)
export type Asset = ContentImage;

// Query params for listing content
export interface ContentListParams {
  variation_id?: string; // single or comma-separated IDs
  include_archived?: boolean;
  include_sources?: boolean;
}

// Content item in list response
export interface ContentListItem {
  created_at: number;
  description: Record<string, string>;
  product_id: number;
  variation_id: number;
  title: Record<string, string>;
  is_archived?: boolean;
  sources?: Record<string, unknown>;
  images?: Asset[];
  integration_id: number;
  integration_metadata: Record<string, unknown>;
}

export interface ContentListResponse {
  data: ContentListItem[];
}

export interface CreateContentRequest {
  company_id: number;
  language: string; // ISO 3166-1 alpha-2 code
  title: string;
  description?: string;
  images?: ContentImage[];
}

export interface CreateContentResponse {
  data: {
    product_id: number;
    variation_id: number;
    message: string;
  };
}

export interface UpdateContentRequest {
  variation_id: number;
  language: string; // ISO 3166-1 alpha-2 code
  title?: string;
  description?: string;
  images?: ContentImage[];
}

export interface DeleteContentRequest {
  variation_id: number;
}

export interface DeleteContentResponse {
  data: {
    success: boolean;
    message: string;
  };
}
