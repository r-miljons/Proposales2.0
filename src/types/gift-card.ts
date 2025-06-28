// src/types/gift-card.ts

import type { Payer } from "./payer";

export type GiftCard = {
  id: number;
  previewImage: string;
  name: string;
  alt: string;
  value: number;
};

export type GiftCardVariant = {
  id: number;
  previewImage: string;
  name: string;
  alt: string;
};

export type GiftCardOrder = {
  payer: Payer;
  giftCard: GiftCard;
};
