import { endpoints } from '@/app/api/client/config/endpoints';
import type { Company } from '@/types/company';

export async function fetchCompanies(): Promise<Company[]> {
  const { method, url, headers } = endpoints.companies.list();
  const fetchOptions: RequestInit = { method };
  if (headers && Object.keys(headers).length > 0) {
    fetchOptions.headers = headers as Record<string, string>;
  }
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    throw new Error(`Failed to fetch companies: ${response.status} ${response.statusText}`);
  }
  const result = await response.json();
  return result.data as Company[];
}
