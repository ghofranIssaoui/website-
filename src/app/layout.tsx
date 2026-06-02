import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navigation from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartRecruitAI | 3LMSolutions",
  description:
    "Smart recruitment powered by AI. Find the best candidates faster.",
  icons: {
    icon: "/13.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <Navigation />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
