import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "하나올림",
  icons: { icon: "/icons/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center h-screen overflow-hidden antialiased">
        <SessionProvider>
          <div className="h-full w-full sm:max-w-sm p-4 bg-white-afa shadow-[0_0_10px_rgba(0,0,0,0.3)] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
