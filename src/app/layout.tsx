import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "Next.js on Firebase App Hosting",
  description: "",
};

import { Header } from "@/components/headers";
import Footer from "@/components/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline theme script to prevent flash of incorrect theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (
                    theme === 'dark' ||
                    (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
                  ) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-primary">
        <Header />
        <main className="max-w-screen-xl mx-auto flex-1 flex flex-col p-4 md:px-8 md:py-16 lg:px-16 xl:px-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
