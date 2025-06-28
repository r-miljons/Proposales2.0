// src/app/api/client/giftCardApi.ts

import { endpoints } from './config/endpoints';
import { handleApiResponse } from './utils/handleApiResponse';
import type { GiftCardOrder, GiftCardVariant } from '@/types/gift-card';
import type { ApiResponse } from '@/types/api';

// Create a new gift card order
import { IS_API_DEV } from './config/baseUrl';

import { handleDevApiResponse } from './utils/handleDevApiResponse';

// Get gift card variants
export async function getGiftCardVariants(): Promise<ApiResponse<GiftCardVariant[]>> {
  if (IS_API_DEV) {
    // Use local sample data in development
    const data = await import('@/sample/sampleGiftCardVariants.json').then(mod => mod.default);
    return handleDevApiResponse(data, { delay: 500 });
  }

  // For test/prod, use the configured endpoint
  const { method, url } = endpoints.giftCardVariants.list;
  const response = await fetch(url, { method });
  return handleApiResponse<GiftCardVariant[]>(response);
}

// Get a single gift card variant by id
export async function getGiftCardVariantById(id: number | string): Promise<ApiResponse<GiftCardVariant>> {
  if (IS_API_DEV) {
    // Use local sample data in development
    const variants = await import('@/sample/sampleGiftCardVariants.json').then(mod => mod.default as GiftCardVariant[]);
    const variant = variants.find(v => String(v.id) === String(id));
    if (variant) {
      return handleDevApiResponse(variant, { delay: 350 });
    } else {
      return handleDevApiResponse(null, { delay: 350, error: 'Not found', message: 'Variant not found in dev sample data' });
    }
  }

  // For test/prod, use the configured endpoint
  const { method, url } = endpoints.giftCardVariants.detail(id);
  const response = await fetch(url, { method });
  return handleApiResponse<GiftCardVariant>(response);
}

export async function createGiftCardOrder(order: GiftCardOrder): Promise<ApiResponse<GiftCardOrder>> {
  // if (IS_API_DEV) {
  //   // Simulate API call with local sample data in development
  //   const data = await import('@/sample/giftCardOrderResponse.json').then(mod => mod.default);
  //   return {
  //     success: true,
  //     data,
  //     error: null,
  //     message: 'Dev sample data',
  //   };
  // }

  // For test/prod, use the configured endpoint (test can use a dedicated URL)
  const { method, url } = endpoints.giftCardOrders.create;
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  return handleApiResponse<GiftCardOrder>(response);
}
