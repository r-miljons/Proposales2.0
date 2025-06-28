// src/app/api/config/endpoints.ts

import type { ContentListParams, ContentListResponse } from '@/types/content';
import type { Company } from '@/types/company';
import { API_BASE_URL } from './baseUrl';

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
} as const;