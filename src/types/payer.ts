// src/types/payer.ts

export type Address = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
};

export type BankAccount = {
  bank?: string;
  accountNumber?: string;
};

export type Phone = {
  countryCode: string;
  number: string;
};

export type PayerBase = {
  clientType: 'individual' | 'business';
  email: string;
  phone: Phone;
  taxId?: string;
  address?: Address;
  bankAccount?: BankAccount;
};

export type IndividualPayer = PayerBase & {
  clientType: 'individual';
  firstName: string;
  lastName: string;
};

export type BusinessPayer = PayerBase & {
  clientType: 'business';
  companyName: string;
};

export type Payer = IndividualPayer | BusinessPayer;
