import type { Metadata } from "next";
import { Teko } from "next/font/google";
import "./globals.css";

const teko = Teko({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${teko.className}`}>
          <main>
            {children}
          </main>
        </body>
    </html>
  );
}
