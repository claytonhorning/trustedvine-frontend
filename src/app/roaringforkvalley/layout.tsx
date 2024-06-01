import type { Metadata } from "next";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/Header";

export const metadata: Metadata = {
  title: "Find Roaring Fork Valley Service Providers",
  description:
    "Find vetted home service and wellness professionals trusted by your network.",
  openGraph: {
    images: ["og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Header /> */}
      <div className="flex">
        <Sidebar />
        <main className="px-6 md:px-10 py-4 block container mx-auto max-w-7xl">
          {children}
        </main>
      </div>
    </>
  );
}
