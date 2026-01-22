import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";

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
          <footer className="border-t py-12 bg-zinc-50 dark:bg-zinc-900">
            <div className="container mx-auto px-4 text-center text-zinc-600 dark:text-zinc-400">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Les Dimanches Mulhousiens</p>
              <p>© 2026 - Tous droits réservés.</p>
                          <div className="flex justify-center gap-6 mt-6">
                            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                            <a href="#" className="hover:text-primary transition-colors">Facebook</a>
                            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                            <Link href="/mentions-legales" className="hover:text-primary transition-colors text-xs self-center">Mentions Légales</Link>
                          </div>            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}