"use client";

import React from "react";

interface PreviewIframeProps {
  html: string;
}

const PreviewIframe: React.FC<PreviewIframeProps> = ({ html }) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.type === 'iframeHeight' && iframeRef.current) {
        iframeRef.current.style.height = event.data.height + 'px';
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <iframe
        ref={iframeRef}
        title="Proposal Preview"
        srcDoc={html}
        className="w-full rounded-lg block"
        style={{ overflow: 'hidden', width: '100%' }}
        sandbox="allow-same-origin allow-scripts"
        scrolling="no"
        onLoad={() => {
          if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({ type: 'requestHeight' }, '*');
          }
        }}
      />
      <style>{`
        iframe::-webkit-scrollbar { display: none; }
        iframe { width: 100% !important; display: block; }
        iframe { overflow-x: hidden !important; }
      `}</style>
    </>
  );
};

export default PreviewIframe;
