import type { CreateProposalRequest } from "@/types/proposal";
import type { Company } from "@/types/company";
import { escapeHtml } from "../escapeHtml";
import { getUploadcareUrl } from "@/lib/uploadcareUrl";

export function getHeroSection(data?: CreateProposalRequest, company?: Company): string {

  // Use getUploadcareUrl for Uploadcare UUIDs, else fallback to direct URL or string
  function getBackgroundImageUrl(bg?: CreateProposalRequest['background_image']): string | undefined {
    if (!bg) return undefined;
    if (typeof bg === 'string') return bg;
    if (typeof bg === 'object' && 'uuid' in bg && typeof bg.uuid === 'string') {
      return getUploadcareUrl(bg.uuid);
    }
    if (typeof bg === 'object' && 'url' in bg && typeof bg.url === 'string') {
      return bg.url;
    }
    return undefined;
  }

  // Recipient logic
  const recipient = data?.recipient;
  let recipientName = '';
  if (recipient) {
    if (recipient.company_name) {
      recipientName = recipient.company_name;
    } else if (recipient.first_name || recipient.last_name) {
      recipientName = [recipient.first_name, recipient.last_name].filter(Boolean).join(' ');
    }
  }

  // Header grid: only render if at least one value exists
  const showPreparedBy = !!company?.name;
  const showPreparedFor = !!recipientName;
  // Company details block (optional, only if company info is present)

  const headerGrid = (showPreparedBy || showPreparedFor)
    ? `<div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:32px;
        font-size:1.1rem;
      ">
        ${showPreparedFor ? `<div>
          <span style="color:#888;font-weight:500;">Prepared for:</span><br>
          <span style="color:#111;font-weight:700;">${escapeHtml(recipientName)}</span>
        </div>` : ''}
        ${showPreparedBy ? `<div>
          <span style="color:#888;font-weight:500;">Prepared by:</span><br>
          <span style="color:#111;font-weight:700;">${escapeHtml(company?.name || '')}</span>
        </div>` : ''}
      </div>`
    : '';

  // Title & intro
  const showTitle = !!data?.title_md;
  const showDesc = !!data?.description_md;
  const titleIntro = (showTitle || showDesc)
    ? `<div>
        ${showTitle ? `<div style="
          font-size:2.5rem;
          font-weight:700;
          margin-bottom:8px;
          line-height:1.1;
          word-break: break-word;
          overflow-wrap: break-word;
        ">
          ${escapeHtml(data!.title_md!)}
        </div>` : ''}
        ${showDesc ? `<div style="
          font-size:1.1rem;
          color:#444;
          margin:32px 0;
          line-height:1.5;
          word-break: break-word;
          overflow-wrap: break-word;
        ">
          ${escapeHtml(data!.description_md!)}
        </div>` : ''}
      </div>`
    : '';

  // Hero image
  const bgUrl = getBackgroundImageUrl(data?.background_image);
  const heroImage = bgUrl
    ? `<img
        src="${bgUrl}"
        alt="Proposal hero image"
        style="
          width:100%;
          height:280px;
          object-fit:cover;
          margin:0 0 16px 0;
          border-radius:10px;
          box-shadow:0 3px 16px rgba(0,0,0,0.11);
        "
      >`
    : '';

  return [titleIntro, heroImage, headerGrid].filter(Boolean).join('\n');
}

