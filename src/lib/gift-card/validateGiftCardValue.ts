import { normalizeGiftCardValue } from "./normalizeGiftCardValue";

/**
 * Validates the string input for a gift card value.
 * Returns null if valid, or an error message string if invalid.
 */
export function validateGiftCardValue(input: string): string | null {
  if (!input) return "Ievadiet summu.";
  if (input.length > 1 && input.startsWith("0")) return "Summa nevar sākties ar 0.";
  const num = Number(input);
  if (isNaN(num)) return "Summa nav derīgs skaitlis.";
  const normalized = normalizeGiftCardValue(input);
  if (num !== normalized) return "Summai jābūt no 5 līdz 10 000 un dalāmai ar 5.";
  return null;
}
