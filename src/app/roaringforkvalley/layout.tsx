import type { Metadata } from "next";
import Sidebar from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "TrustedVine | Roaring Fork Valley",
  description:
    "Find vetted home service and wellness professionals trusted by your network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="px-10 py-4 block container mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
