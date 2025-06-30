import type { CreateProposalRequest } from "@/types/proposal";
import { escapeHtml } from "../escapeHtml";

export function getMainFrameHtml(innerHtml: string, data?: CreateProposalRequest): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${data?.title_md ? escapeHtml(data.title_md) : 'Untitled Proposal'}</title>
  <meta name="viewport" />
</head>
<body style="background:#fff;color:#111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin:0;padding:0; box-sizing:border-box;">
    <main style="max-width:210mm;width:100%;margin:0 auto; padding:40px 32px 32px 32px; box-sizing:border-box;">
      ${innerHtml}
    </main>
</body>
</html>`;
}
