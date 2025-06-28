// Utility function to sanitize and normalize gift card input value
// Ensures divisibility by 5 and maximum value of 10,000

export function normalizeGiftCardValue(input: string | number): number {
    // Remove all non-digit characters
    let digits = typeof input === "string" ? input.replace(/[^0-9]/g, "") : String(input);
    // Treat empty or all-zero strings as 0
    let num = digits ? parseInt(digits, 10) : 0;
    if (isNaN(num) || num < 5) return 5;
    if (num > 10000) num = 10000;
    // Round down to nearest divisible by 5
    num = Math.floor(num / 5) * 5;
    return num;
}