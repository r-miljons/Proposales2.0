import { NextRequest, NextResponse } from 'next/server';
import { endpoints } from '@/app/api/client/config/endpoints';
import { UPLOADCARE_PUB_API_KEY } from '@/app/api/client/config/keyLocations';
import type { UploadcareStoreValue } from '@/types/uploadcare';
import { UPLOADCARE_STORE_VALUES } from '@/types/uploadcare';

export async function POST(req: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await req.formData();
    const fileEntry = formData.get('file');
    if (
      !fileEntry ||
      typeof fileEntry !== 'object' ||
      (typeof (fileEntry as any).arrayBuffer !== 'function' && typeof (fileEntry as any).stream !== 'function')
    ) {
      return NextResponse.json({ error: 'No file provided or file is invalid.' }, { status: 400 });
    }
    const file = fileEntry as Blob;
    const metadata: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('metadata[') && key.endsWith(']') && typeof value === 'string') {
        const metaKey = key.slice(9, -1);
        metadata[metaKey] = value;
      }
    }

    // Type-safe UPLOADCARE_STORE
    const storeValue = formData.get('UPLOADCARE_STORE');
    const UPLOADCARE_STORE: UploadcareStoreValue =
      UPLOADCARE_STORE_VALUES.includes(storeValue as UploadcareStoreValue)
        ? (storeValue as UploadcareStoreValue)
        : 'auto';

    // Prepare payload for Uploadcare endpoint
    const uploadPayload = {
      UPLOADCARE_PUB_KEY: UPLOADCARE_PUB_API_KEY,
      UPLOADCARE_STORE,
      file,
      metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
      expire: formData.get('expire') ? Number(formData.get('expire')) : undefined,
    };

    const { method, url, body, expectedStatus, responseData } = endpoints.uploadcare.directUpload(uploadPayload);

    const fetchOptions: RequestInit = {
      method,
      body,
    };

    const apiRes = await fetch(url, fetchOptions);
    if (!apiRes.ok) {
      return NextResponse.json({ error: `Failed to upload file: ${apiRes.status} ${apiRes.statusText}` }, { status: apiRes.status });
    }

    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}
