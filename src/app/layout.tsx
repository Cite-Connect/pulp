// src/app/layout.tsx
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';
import GlobalStyles from './styles/GlobalStyles';
import GlobalLoader from '@/components/common/GlobalLoader';

// Configure the font
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'CiteConnect',
  description: 'AI-Powered Research Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <GlobalLoader />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}