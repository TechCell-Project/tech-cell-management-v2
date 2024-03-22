import type { Metadata } from 'next';
import { quickSandFont } from '@/components/config';
import { AppProvider, ThemeProvider } from '@/components/provider';
import { Toaster } from '@/components/ui/toaster';
import './custom.css';
import './globals.css';

import Favicon from '~public/images/favicon.ico';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Trang quản trị Techcell',
  description: 'Trang quản trị Techcell',
  icons: {
    icon: {
      url: Favicon.src,
      type: 'image/png',
    },
    shortcut: { url: Favicon.src, type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html
        lang="en"
        style={{ colorScheme: 'light' }}
        className={`${quickSandFont.className} light`}
      >
        <head />
        <body className="min-h-screen flex justify-center items-center">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <main className="w-full">{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AppProvider>
  );
}
