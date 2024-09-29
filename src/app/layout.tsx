import type { Metadata } from "next";
import "./globals.css";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "Pizza & Pasta",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scroll-smooth">
        <main>
          {children}
        </main>
        <Toast />
      </body>
    </html>
  );
}
