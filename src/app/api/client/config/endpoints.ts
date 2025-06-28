// src/app/api/config/endpoints.ts

import type { ContentListParams, ContentListResponse } from '@/types/content';
import type { Company } from '@/types/company';
import { getAuth } from '@/app/api/client/utils/getAuth';

import { API_BASE_URL } from './baseUrl';

export const endpoints = {
  content: {
    list: (params?: ContentListParams) => {
      const auth = getAuth();
      const searchParams = params
        ? new URLSearchParams(params as any).toString()
        : '';
      return {
        method: 'GET',
        url: `${API_BASE_URL}v3/content${searchParams ? `?${searchParams}` : ''}`,
        expectedStatus: 200,
        headers: auth?.key ? { Authorization: `Bearer ${auth.key}` } : {},
        responseData: {} as ContentListResponse,
      };
    },
  },
  companies: {
    list: () => {
      const auth = getAuth();
      return {
        method: "GET",
        url: `${API_BASE_URL}v3/companies`,
        expectedStatus: 200,
        headers: auth?.key ? { Authorization: `Bearer ${auth.key}` } : {},
        responseData: [] as Company[],
      };
    },
  },
} as const;