import type { Metadata } from "next";
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
      <body className="flex items-center justify-center h-screen overflow-hidden antialiased sm:bg-amber-50">
        <div className="h-full w-full sm:max-w-sm p-4 bg-white overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
