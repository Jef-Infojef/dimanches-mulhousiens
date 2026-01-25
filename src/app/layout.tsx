import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Les Dimanches Mulhousiens | Édition 2026",
  description: "L'événement incontournable des créateurs et artisans à Mulhouse. Rejoignez-nous les premiers dimanches de juin à septembre 2026.",
  openGraph: {
    title: "Les Dimanches Mulhousiens | Édition 2026",
    description: "Découvrez les artistes et artisans locaux lors d'un rendez-vous dominical unique.",
    url: "https://dimanches-mulhousiens.vercel.app",
    siteName: "Les Dimanches Mulhousiens",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Dimanches Mulhousiens | Édition 2026",
    description: "Événement mensuel des créateurs et artisans à Mulhouse.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-zinc-950`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}