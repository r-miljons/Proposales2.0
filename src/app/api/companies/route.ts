import { NextRequest, NextResponse } from 'next/server';
import { endpoints } from '@/app/api/client/config/endpoints';
import { cleanHeaders } from '@/app/api/client/utils/auth/cleanHeaders';

export async function GET(req: NextRequest) {
  try {
    const { method, url } = endpoints.companies.list();
    const authHeader = req.headers.get('authorization');
    const mergedHeaders = {
      'Content-Type': 'application/json',
      ...(authHeader ? { Authorization: authHeader } : {}),
    };
    const safeHeaders = cleanHeaders(mergedHeaders);

    const fetchOptions: RequestInit = {
      method,
      headers: safeHeaders,
    };

    const apiRes = await fetch(url, fetchOptions);
    if (!apiRes.ok) {
      return NextResponse.json({ error: `Failed to fetch companies: ${apiRes.status} ${apiRes.statusText}` }, { status: apiRes.status });
    }

    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}
