import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "وصل دم | WaslDam — منصة التبرع بالدم",
  description:
    "وصل دم يربط المتبرعين بالمحتاجين. سجّل كمتبرع أو ابحث عن متبرع في مدينتك — منصة مجانية لخدمة المجتمع.",
  keywords: [
    "التبرع بالدم",
    "متبرع دم",
    "بنك الدم",
    "وصل دم",
    "WaslDam",
    "Blood Donation",
    "Blood Donor",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${inter.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white text-gray-900">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}