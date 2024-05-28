import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  console.log(session);

  return (
    <html lang="en">
      <head>
        <meta
          name="facebook-domain-verification"
          content="2qsqvglvgjf7ex1rh4tsa8pol05zua"
        />
        <script
          type="text/javascript"
          src="/static/chat.js"
        ></script>
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
