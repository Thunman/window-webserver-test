import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WinWeb",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "black", overflow: "hidden" }}>
      <body>{children}</body>
    </html>
  );
}
