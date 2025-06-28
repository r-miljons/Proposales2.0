// Centralized API base URL with environment support

const API_ENV = process.env.NEXT_PUBLIC_API_ENV || 'prod';

const API_BASE_URLS = {
  dev: '', // For dev, we'll use local/sample data
  prod: 'https://api.proposales.com/', // prod and test the same url, because we test in prod like real men
  test: 'https://api.proposales.com/',
} as const;

export const API_ENVIRONMENT = API_ENV as keyof typeof API_BASE_URLS;
export const API_BASE_URL = API_BASE_URLS[API_ENVIRONMENT];
export const IS_API_DEV = API_ENVIRONMENT === 'dev';
export const IS_API_TEST = API_ENVIRONMENT === 'test';
