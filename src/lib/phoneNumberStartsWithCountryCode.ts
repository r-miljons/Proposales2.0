import countries from './countries.json';

/**
 * Checks if the phone number starts with the country calling code for the given country (cca2).
 * @param cca2 - The 2-letter country code (e.g. 'US', 'LV')
 * @param phoneNumber - The phone number string (can start with + or not)
 * @returns boolean - true if phone number starts with the country code, false otherwise
 */
export function phoneNumberStartsWithCountryCode(cca2: string, phoneNumber: string): boolean {
  const country = (countries as any[]).find(c => c.cca2 === cca2.toUpperCase());
  if (!country || !country.idd || !country.idd.root) return false;
  const root = country.idd.root;
  const suffixes: string[] = country.idd.suffixes || [];
  if (!suffixes.length) return false;

  // Normalize phone number (remove spaces, dashes, etc.)
  const normalized = phoneNumber.replace(/[^\d+]/g, '');

  // Build all possible full codes
  const codes = suffixes.map(s => `${root}${s}`);

  // Check if phone number starts with any of the codes
  return codes.some(code =>
    normalized.startsWith(code) || normalized.startsWith(code.replace('+', ''))
  );
}

