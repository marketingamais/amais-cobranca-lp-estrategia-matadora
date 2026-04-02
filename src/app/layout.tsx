import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MetaPixel } from '@/components/analytics/MetaPixel';

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mapeamento de Inadimplência | Amais Cobrança',
  description: 'Diagnóstico gratuito e presencial sobre seus processos de cobrança e recuperação de mensalidades para escolas privadas de Recife.',
  other: {
    'theme-color': '#05050a',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preload do vídeo de background — elimina latência no LCP */}
        <link rel="preload" href="/bg-video.mp4" as="video" type="video/mp4" />
      </head>
      <body 
        className={`${dmSans.variable} ${inter.variable} antialiased min-h-screen bg-bg-base text-text-primary`}
        suppressHydrationWarning
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
