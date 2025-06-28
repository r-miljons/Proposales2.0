import type { Company } from '@/types/company';
import { addAuthHeader } from '@/app/api/client/utils/addAuthHeader';

export async function fetchCompanies(): Promise<Company[]> {
  const response = await fetch('/api/companies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...addAuthHeader(),
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch companies: ${response.status} ${response.statusText}`);
  }
  const result = await response.json();
  // If the external API returns a .data property, use it; otherwise, return the whole result.
  return result.data ? (result.data as Company[]) : (result as Company[]);
}

