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
      <body
        className={`antialiased [&::-webkit-scrollbar]:hidden`}
      >
        {children}
      </body>
    </html>
  );
}
