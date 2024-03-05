import type { Metadata } from "next";
import { Domine } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";

// This font is similar to recoleta
const domine = Domine({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mesabite",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${domine.className} min-h-screen w-full bg-primary-background`}
      >
        <Toaster />
        <Header />
        <div className="p-6">{children}</div>
      </body>
    </html>
  );
}
