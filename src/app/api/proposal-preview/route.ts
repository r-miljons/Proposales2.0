import { NextRequest } from 'next/server';
import { getProposalPreview } from '@/lib/proposal-preview/getProposalPreview';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Support both { data, company } and { ...proposalFields, company }
    let proposalData, company;
    if (body && typeof body === 'object' && ('data' in body || 'company' in body)) {
      proposalData = body.data ?? body;
      company = body.company;
    } else {
      proposalData = body;
      company = undefined;
    }
    const html = await getProposalPreview(proposalData, company);
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    return new Response('Failed to load proposal preview', { status: 500 });
  }
}
