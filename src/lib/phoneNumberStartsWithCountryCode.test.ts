import { phoneNumberStartsWithCountryCode } from './phoneNumberStartsWithCountryCode';

describe('phoneNumberStartsWithCountryCode', () => {
  it('returns true for Latvian numbers with +371', () => {
    expect(phoneNumberStartsWithCountryCode('LV', '+37112345678')).toBe(true);
  });

  it('returns true for Latvian numbers with 371', () => {
    expect(phoneNumberStartsWithCountryCode('LV', '37112345678')).toBe(true);
  });

  it('returns true for US numbers with +1', () => {
    expect(phoneNumberStartsWithCountryCode('US', '+12025550123')).toBe(true);
  });

  it('returns false for US numbers without country code', () => {
    expect(phoneNumberStartsWithCountryCode('US', '2025550123')).toBe(false);
  });

  it('returns true for Aruba numbers with +297', () => {
    expect(phoneNumberStartsWithCountryCode('AW', '+2971234567')).toBe(true);
  });

  it('returns true for Aruba numbers with 297', () => {
    expect(phoneNumberStartsWithCountryCode('AW', '2971234567')).toBe(true);
  });

  it('returns false for Aruba numbers without country code', () => {
    expect(phoneNumberStartsWithCountryCode('AW', '1234567')).toBe(false);
  });

  it('returns false for unknown country code', () => {
    expect(phoneNumberStartsWithCountryCode('XX', '+1234567890')).toBe(false);
  });
});
