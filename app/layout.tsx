import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pet Finder",
  description: "Discover your perfect companion with Pet Finder."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-white`}>
        <div className="h-24">
          <Navbar />
        </div>
        {children}
        <div>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
