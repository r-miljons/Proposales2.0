// Email validation utility
export function validateEmail(email: string): boolean {
  // Must contain exactly one @
  if ((email.match(/@/g) || []).length !== 1) return false;

  // Basic structure check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;

  const [local, domain] = email.split("@");
  // No consecutive dots in domain
  if (domain.includes("..")) return false;
  // Domain must not start or end with a dot
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  // Only allow valid characters in local part (letters, digits, and . _ - +)
  // This excludes # and ! for stricter web compatibility
  if (!/^[A-Za-z0-9._+\-]+$/.test(local)) return false;

  // Only allow valid characters in domain part (letters, digits, hyphens, dots)
  if (!/^[A-Za-z0-9.-]+$/.test(domain)) return false;

  // Domain must not have a plus, #, or !
  if (domain.includes('+') || domain.includes('#') || domain.includes('!')) return false;
  // Local must not have # or !
  if (local.includes('#') || local.includes('!')) return false;

  return true;
}
