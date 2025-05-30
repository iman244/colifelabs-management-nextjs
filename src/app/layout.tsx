import type { Metadata } from "next";
import "./globals.css";
import { Vazirmatn } from "next/font/google";
import Providers from "./_providers";

const vazirmatn = Vazirmatn({
  weight: ["300", "400", "500", "700"],
  variable: "--font-vazirmatn",
});


export const metadata: Metadata = {
  title: "Colifelabs Management",
  description: "Colifelabs Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" data-toolpad-color-scheme="dark" suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
