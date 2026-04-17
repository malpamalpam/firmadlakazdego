import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firma Dla Kazdego - Zakladanie firm, obsluga cudzoziemcow",
  description:
    "Firma Dla Kazdego - profesjonalna pomoc w zakladaniu i prowadzeniu firm. Obsluga cudzoziemcow, dofinansowania, uslugi dla biznesu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="min-h-screen flex flex-col font-montserrat">
        {children}
      </body>
    </html>
  );
}
