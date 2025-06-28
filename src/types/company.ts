export interface Company {
  id: number;
  created_at: number;
  name: string;
  currency: string;
  tax_mode: "standard" | "simplified" | "none";
  registration_number: string;
  website_url: string;
}
