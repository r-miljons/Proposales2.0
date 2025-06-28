// src/app/api/config/endpoints.ts

import type { ContentListParams, ContentListResponse } from '@/types/content';
import type { Company } from '@/types/company';
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
  uploadcare: {
    /**
     * Direct upload to Uploadcare (multipart/form-data)
     * @see https://upload.uploadcare.com/base/
     */
    directUpload: (payload: import('@/types/uploadcare').UploadcareDirectUploadPayload) => {
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
        responseData: {} as import('@/types/uploadcare').UploadcareDirectUploadResponse,
      };
    },
  },
} as const;