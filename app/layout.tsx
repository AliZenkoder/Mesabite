import type { Metadata } from "next";
import { Domine } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/redux/provider";

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
        <ReduxProvider>
          <Toaster />
          <Header />
          <div className="p-6">{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
