'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export const Clarity = () => {
  const clarityId = 'w5nay4roxa';
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const load = () => setShouldLoad(true);
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(load);
    } else {
      setTimeout(load, 2000);
    }
  }, []);

  if (!shouldLoad) return null;

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            console.log('🔵 Microsoft Clarity: Deferred Load (ID: ' + i + ')');
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
};
