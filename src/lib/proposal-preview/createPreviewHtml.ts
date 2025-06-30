import { getMainFrameHtml } from "./html-elements/getMainFrameHtml";
import { getHeroSection } from "./html-elements/getHeroSection";
import { getBlockSection } from "./html-elements/getBlockSection";
import type { CreateProposalRequest } from "@/types/proposal";

import type { Company } from "@/types/company";

export function createPreviewHtml(data?: CreateProposalRequest, company?: Company): string {
  const hero = getHeroSection(data, company);
  const blocks = getBlockSection(data);
  const innerHtml = [hero, blocks].filter(Boolean).join('\n');
  return getMainFrameHtml(innerHtml, data);
}
