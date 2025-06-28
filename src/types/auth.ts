import type { Company } from '@/types/company';

export interface AuthData {
  key: string;
  company?: Company;
}