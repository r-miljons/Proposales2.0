// src/app/api/config/endpoints.ts

import type {
  ContentListParams,
  ContentListResponse,
  CreateContentRequest,
  CreateContentResponse,
} from '@/types/content';
import type { Company } from '@/types/company';
import type { CreateProposalRequest, CreateProposalResponse, PatchProposalDataRequest, PatchProposalDataResponse } from '@/types/proposal';
import type { UploadcareDirectUploadPayload, UploadcareDirectUploadResponse } from '@/types/uploadcare';
import { API_BASE_URL, FILE_UPLOAD_BASE_URL } from './baseUrl';

export const endpoints = {
  content: {
    list: (params?: ContentListParams) => {
      const searchParams = params
        ? new URLSearchParams(params as any).toString()
        : '';
      return {
        method: 'GET',
        url: `${API_BASE_URL}v3/content${searchParams ? `?${searchParams}` : ''}`,
        expectedStatus: 200,
        responseData: {} as ContentListResponse,
      };
    },
    /**
     * Create a new content item in the library
     * @param payload - The content data to create
     * @returns { method, url, expectedStatus, body, responseData }
     */
    create: (payload: CreateContentRequest) => {
      return {
        method: 'POST',
        url: `${API_BASE_URL}v3/content`,
        expectedStatus: 200,
        body: JSON.stringify(payload),
        responseData: {} as CreateContentResponse,
      };
    },
  },
  companies: {
    list: () => {
      return {
        method: "GET",
        url: `${API_BASE_URL}v3/companies`,
        expectedStatus: 200,
        responseData: [] as Company[],
      };
    },
  },
  proposals: {
    /**
     * Create a new proposal draft
     * @param payload - The proposal draft data
     * @returns { method, url, expectedStatus, body, responseData }
     */
    create: (payload: CreateProposalRequest) => {
      return {
        method: 'POST',
        url: `${API_BASE_URL}v3/proposals`,
        expectedStatus: 200,
        body: JSON.stringify(payload),
        responseData: {} as CreateProposalResponse,
      };
    },
  },
  uploadcare: {
    /**
     * Direct upload to Uploadcare (multipart/form-data)
     */
    directUpload: (payload: UploadcareDirectUploadPayload) => {
      const formData = new FormData();
      formData.append('UPLOADCARE_PUB_KEY', payload.UPLOADCARE_PUB_KEY);
      formData.append('UPLOADCARE_STORE', payload.UPLOADCARE_STORE || 'auto');
      formData.append('file', payload.file);
      if (payload.metadata) {
        Object.entries(payload.metadata).forEach(([key, value]) => {
          formData.append(`metadata[${key}]`, value);
        });
      }
      if (payload.expire) {
        formData.append('expire', payload.expire.toString());
      }
      return {
        method: 'POST',
        url: FILE_UPLOAD_BASE_URL,
        expectedStatus: 200,
        body: formData,
        responseData: {} as UploadcareDirectUploadResponse,
      };
    },
  },
} as const;