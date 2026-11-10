import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import "./globals.css";

const serif = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KANCHEEPURAM VAKULA SILKS — Dressed in Poetry",
  description:
    "Pure silk sarees, Banarasi, Kanjivaram, and heritage weaves. Handcrafted luxury sarees from the Kancheepuram Vakula Silks atelier.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <LenisProvider>
          <CartProvider>{children}</CartProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
