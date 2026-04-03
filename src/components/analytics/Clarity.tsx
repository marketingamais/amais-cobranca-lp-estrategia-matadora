'use client';

import Script from 'next/script';

export const Clarity = () => {
  // Ativando com o ID manual fornecido pelo usuário: w5nay4roxa
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || 'w5nay4roxa';

  if (!clarityId) return null;

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
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
};
