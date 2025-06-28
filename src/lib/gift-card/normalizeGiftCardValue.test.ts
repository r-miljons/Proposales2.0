import { normalizeGiftCardValue } from "@/lib/gift-card/normalizeGiftCardValue";

describe("normalizeGiftCardValue", () => {
  it("returns 5 for input less than 5", () => {
    expect(normalizeGiftCardValue(0)).toBe(5);
    expect(normalizeGiftCardValue(2)).toBe(5);
    expect(normalizeGiftCardValue(4)).toBe(5);
  });

  it("limits to 10,000", () => {
    expect(normalizeGiftCardValue(10001)).toBe(10000);
    expect(normalizeGiftCardValue(99999)).toBe(10000);
  });

  it("rounds down to nearest divisible by 5", () => {
    expect(normalizeGiftCardValue(13)).toBe(10);
    expect(normalizeGiftCardValue(17)).toBe(15);
    expect(normalizeGiftCardValue(20)).toBe(20);
  });

  it("handles string input and strips non-digits", () => {
    expect(normalizeGiftCardValue("abc1234def")).toBe(1230);
    expect(normalizeGiftCardValue("99999")).toBe(10000);
    expect(normalizeGiftCardValue("17")).toBe(15);
    expect(normalizeGiftCardValue("4")).toBe(5);
  });

  it("handles leading zeros in input", () => {
    expect(normalizeGiftCardValue("05")).toBe(5);
    expect(normalizeGiftCardValue("00020")).toBe(20);
    expect(normalizeGiftCardValue("000")).toBe(5);
    expect(normalizeGiftCardValue("012345")).toBe(10000); // Should clamp to 10000
    // This is a tricky case: '09985' is normalized to 9985, but in a real form this should be considered invalid due to leading zero
    expect(normalizeGiftCardValue("09985")).toBe(9985);
  });

  it("handles NaN and invalid input", () => {
    expect(normalizeGiftCardValue("")).toBe(5);
    expect(normalizeGiftCardValue("notanumber")).toBe(5);
    expect(normalizeGiftCardValue(undefined as any)).toBe(5);
    expect(normalizeGiftCardValue(null as any)).toBe(5);
  });
});
