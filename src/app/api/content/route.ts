import { NextRequest, NextResponse } from 'next/server';
import { endpoints } from '@/app/api/client/config/endpoints';
import { cleanHeaders } from '@/app/api/client/utils/auth/cleanHeaders';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    const { method, url, expectedStatus } = endpoints.content.list(params);
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
      return NextResponse.json({ error: `Failed to list content: ${apiRes.status} ${apiRes.statusText}` }, { status: apiRes.status });
    }
    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { method, url, body, expectedStatus } = endpoints.content.create(payload);
    const authHeader = req.headers.get('authorization');
    const mergedHeaders = {
      'Content-Type': 'application/json',
      ...(authHeader ? { Authorization: authHeader } : {}),
    };
    const safeHeaders = cleanHeaders(mergedHeaders);
    const fetchOptions: RequestInit = {
      method,
      headers: safeHeaders,
      body,
    };
    const apiRes = await fetch(url, fetchOptions);
    if (!apiRes.ok) {
      return NextResponse.json({ error: `Failed to create content: ${apiRes.status} ${apiRes.statusText}` }, { status: apiRes.status });
    }
    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}
