import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MobileBottomNav } from "./components/mobile-bottom-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rocha Berazategui | Distribuidora mayorista gastronómica",
  description:
    "Rocha Berazategui es una distribuidora mayorista de alimentos para pizzerías, hamburgueserías, bares, rotiserías y negocios gastronómicos.",
  applicationName: "Rocha Berazategui",
  keywords: [
    "rocha berazategui",
    "distribuidora gastronómica",
    "mayorista de alimentos",
    "insumos gastronómicos",
    "muzzarella",
    "harina 50 kg",
    "congelados",
    "ventas mayoristas",
  ],
  authors: [{ name: "Rocha Berazategui" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Rocha Berazategui",
    startupImage: ["/icon.svg"],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#081120",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-24 md:pb-0">
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}

// Made with Bob
