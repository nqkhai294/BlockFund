import type { Metadata } from "next";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "./components/layout/navbar/Navbar";

export const metadata: Metadata = {
  title: "BlockFund",
  description:
    "Starter template for using thirdweb SDK with Next.js App router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          <Navbar />
          {children}
          </ThirdwebProvider>
      </body>
    </html>
  );
}
