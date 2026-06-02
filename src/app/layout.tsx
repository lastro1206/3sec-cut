import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3초컷",
  description: "요식업 숏폼 대본 자동 생성 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F2F4F6] text-[#333D4B]">
        <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-white shadow-[0_0_40px_rgba(51,61,75,0.08)]">
          {children}
        </div>
      </body>
    </html>
  );
}
