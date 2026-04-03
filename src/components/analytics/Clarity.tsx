'use client';

import Script from 'next/script';

export const Clarity = () => {
  // Ativação absoluta com o ID: w5nay4roxa
  const clarityId = 'w5nay4roxa';

  return (
    <Script
      id="microsoft-clarity"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            console.log('🔵 Microsoft Clarity: Active (ID: ' + i + ')');
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
};
