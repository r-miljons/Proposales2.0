import type { CreateProposalRequest, ProposalBlock } from "@/types/proposal";
import { escapeHtml } from "../escapeHtml";
import { getUploadcareUrl } from "@/lib/uploadcareUrl";

export function getBlockSection(data?: CreateProposalRequest): string {
  const blocks = data?.blocks;
  if (!blocks || blocks.length === 0) return '';

  // Helper: get image URLs from block
  function getBlockImages(block: ProposalBlock): string[] {
    if (!block.image_uuids || !Array.isArray(block.image_uuids)) return [];
    return block.image_uuids.filter(Boolean).map(uuid => getUploadcareUrl(uuid));
  }

  // Only render blocks with at least a title, description, or image
  const renderedBlocks = blocks
    .map((block, idx) => {
      const hasContent = block.title || block.description || (block.image_uuids && block.image_uuids.length > 0);
      if (!hasContent) return '';
      const images = getBlockImages(block);
      return `<div style="
        background:#f7f7f7;
        border-radius:10px;
        padding:21px;
        display:flex;
        flex-direction:column;
        gap:8px;
        box-shadow:0 2px 6px rgba(0,0,0,0.04);
      ">
        ${block.title ? `<div style="
          font-size:1.3rem;
          font-weight:600;
          letter-spacing:0.01em;
          margin-bottom:8px;
          color:#222;
        ">${escapeHtml(block.title)}</div>` : ''}
        ${block.description ? `<div style="
          font-size:1rem;
          color:#353535;
          flex-grow:1;
          margin-bottom:8px;
          line-height:1.5;
        word-break: break-word;
        overflow-wrap: break-word;
        ">${escapeHtml(block.description)}</div>` : ''}
        ${images.length > 0 ? `<div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
          ${images.map(url => `<img src="${url}" alt="Block image" style="width:100%;height:130px;object-fit:cover;border-radius:6px;background:#ccc;flex:2 1 0;">`).join('')}
        </div>` : ''}
      </div>`;
    })
    .filter(Boolean)
    .join('\n');

  if (!renderedBlocks) return '';

  return `<!-- Sections (vertical stack) -->
    <div style="
      display:flex;
      flex-direction:column;
      gap:32px;
      margin-top:48px;
    ">
      ${renderedBlocks}
    </div>`;
}
