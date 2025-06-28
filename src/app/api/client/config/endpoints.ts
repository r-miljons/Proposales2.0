// src/app/api/config/endpoints.ts

import type { GiftCardOrder, GiftCardVariant } from '@/types/gift-card';

import { API_BASE_URL } from './baseUrl';

export const endpoints = {
  giftCardOrders: {
    create: {
      method: "POST",
      url: `${API_BASE_URL}gift-card-orders`,
      expectedStatus: 201,
      requestData: {} as GiftCardOrder,
      responseData: {} as GiftCardOrder,
    },
  },
  giftCardVariants: {
    list: {
      method: "GET",
      url: `${API_BASE_URL}gift-card-variants`,
      expectedStatus: 200,
      responseData: [] as GiftCardVariant[],
    },
    detail: (id: number | string) => ({
      method: "GET",
      url: `${API_BASE_URL}gift-card-variants/${id}`,
      expectedStatus: 200,
      responseData: {} as GiftCardVariant,
    }),
  },
} as const;