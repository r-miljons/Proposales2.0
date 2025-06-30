"use client";

import React from "react";

interface PreviewIframeProps {
  html: string;
}

const PreviewIframe: React.FC<PreviewIframeProps> = ({ html }) => (
  <>
    <iframe
      title="Proposal Preview"
      srcDoc={html}
      className="w-full h-full rounded-lg block"
      style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', width: '100%', height: '100%' }}
      sandbox="allow-same-origin"
    />
    <style>{`
      iframe::-webkit-scrollbar { display: none; }
      iframe { width: 100% !important; height: 100% !important; display: block; }
      iframe { overflow-x: hidden !important; }
    `}</style>
  </>
);

export default PreviewIframe;
