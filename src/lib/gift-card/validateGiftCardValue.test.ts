import { validateGiftCardValue } from "@/lib/gift-card/validateGiftCardValue";

describe("validateGiftCardValue", () => {
  it("returns error for empty input", () => {
    expect(validateGiftCardValue("")).toBe("Ievadiet summu.");
  });

  it("returns error for leading zero", () => {
    expect(validateGiftCardValue("05")).toBe("Summa nevar sākties ar 0.");
    expect(validateGiftCardValue("00020")).toBe("Summa nevar sākties ar 0.");
    expect(validateGiftCardValue("09985")).toBe("Summa nevar sākties ar 0.");
  });

  it("returns error for NaN input", () => {
    expect(validateGiftCardValue("notanumber")).toBe("Summa nav derīgs skaitlis.");
    expect(validateGiftCardValue(" ")).toBe("Summa nav derīgs skaitlis.");
  });

  it("returns error for not divisible by 5", () => {
    expect(validateGiftCardValue("13")).toBe("Summai jābūt no 5 līdz 10 000 un dalāmai ar 5.");
    expect(validateGiftCardValue("17")).toBe("Summai jābūt no 5 līdz 10 000 un dalāmai ar 5.");
  });

  it("returns error for out of range", () => {
    expect(validateGiftCardValue("3")).toBe("Summai jābūt no 5 līdz 10 000 un dalāmai ar 5.");
    expect(validateGiftCardValue("10001")).toBe("Summai jābūt no 5 līdz 10 000 un dalāmai ar 5.");
    expect(validateGiftCardValue("99999")).toBe("Summai jābūt no 5 līdz 10 000 un dalāmai ar 5.");
  });

  it("returns null for valid values", () => {
    expect(validateGiftCardValue("5")).toBeNull();
    expect(validateGiftCardValue("10")).toBeNull();
    expect(validateGiftCardValue("20")).toBeNull();
    expect(validateGiftCardValue("10000")).toBeNull();
    expect(validateGiftCardValue("50")).toBeNull();
  });

  it("returns error for valid number with non-digit chars", () => {
    expect(validateGiftCardValue("abc1234def")).toBe("Summai jābūt no 5 līdz 10 000 un dalāmai ar 5.");
  });
});