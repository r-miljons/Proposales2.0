// src/app/api/client/utils/handleDevApiResponse.ts

export async function handleDevApiResponse<T>(
  payload: T,
  options?: { delay?: number; error?: string | null; message?: string }
): Promise<{ success: boolean; data: T | null; error: string | null; message: string }> {
  const { delay = 400, error = null, message = "Dev sample data" } = options || {};
  await new Promise(res => setTimeout(res, delay));
  return {
    success: !error,
    data: error ? null : payload,
    error,
    message,
  };
}
