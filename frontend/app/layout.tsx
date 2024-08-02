import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap"
})


export const metadata: Metadata = {
  title: "ATC 500 Latam B17 Prueba Tecnica",
  description: "Prueba Técnica para entrar en ATC 500",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-white`}>{children}</body>
    </html>
  );
}
