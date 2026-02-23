// --- START OF FILE layout.tsx ---

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventario de Laboratorio de Electrónica",
  description: "Sistema de gestión de inventario y solicitudes de materiales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100`}>{children}</body>
    </html>
  );
}