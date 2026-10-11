import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stevenario - L'Oracolo Ufficiale e Dizionario di Steve",
  description: "L'Intelligenza Artificiale satirica e cordiale addestrata sulle perle, le scuse e i ritardi leggendari di Steve. Chiedi prima che cambi idea!",
  openGraph: {
    title: "Stevenario - L'AI di Steve",
    description: "Chiedi qualsiasi cosa a Steve: scuse, consigli strampalati e perle di vita.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
