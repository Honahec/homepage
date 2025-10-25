import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "个人主页 | Honahec",
  description: "一个简约的个人主页",
  icons: "https://image.honahec.cc/favicon-blue.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
