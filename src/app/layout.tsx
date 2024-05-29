import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrustedVine | Vetted Home Service Professionals",
  description:
    "Find vetted home service and wellness professionals trusted by your friends and family.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <meta
          name="facebook-domain-verification"
          content="2qsqvglvgjf7ex1rh4tsa8pol05zua"
        />
        <Script
          type="text/javascript"
          src="/static/chat.js"
        ></Script>
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
      <GoogleAnalytics gaId="G-L4WS5RBC38" />
    </html>
  );
}
