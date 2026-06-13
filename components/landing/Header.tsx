"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { CloseIcon, DropletIcon, GlobeIcon, MenuIcon } from "@/components/ui/Icons";

const navLinks = [
  { key: "home" as const, href: "/" },
  { key: "donate" as const, href: "/register" },
  { key: "findDonor" as const, href: "/search" },
  { key: "about" as const, href: "#about" },
];

export function Header() {
  const { t, locale, setLocale, dir } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded-lg"
          aria-label={t.brand.name}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/25 transition-transform group-hover:scale-105">
            <DropletIcon className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-gray-900">{t.brand.name}</span>
            <span className="text-xs font-medium text-gray-400">{t.brand.tagline}</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
        >
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="hidden items-center rounded-xl border border-gray-200 bg-gray-50 p-1 sm:flex"
            role="group"
            aria-label={locale === "ar" ? "تبديل اللغة" : "Language switcher"}
          >
            <button
              type="button"
              onClick={() => setLocale("ar")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                locale === "ar"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-pressed={locale === "ar"}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                locale === "en"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-pressed={locale === "en"}
            >
              English
            </button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? (locale === "ar" ? "إغلاق القائمة" : "Close menu") : (locale === "ar" ? "فتح القائمة" : "Open menu")}
          >
            {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-100 bg-white px-4 py-4 md:hidden"
          dir={dir}
        >
          <nav className="flex flex-col gap-1" aria-label={locale === "ar" ? "التنقل للجوال" : "Mobile navigation"}>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                {t.nav[link.key]}
              </Link>
            ))}
          </nav>

          <div
            className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1"
            role="group"
            aria-label={locale === "ar" ? "تبديل اللغة" : "Language switcher"}
          >
            <GlobeIcon className="mx-2 h-4 w-4 text-gray-400" />
            <button
              type="button"
              onClick={() => setLocale("ar")}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                locale === "ar" ? "bg-white text-red-600 shadow-sm" : "text-gray-500"
              }`}
              aria-pressed={locale === "ar"}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                locale === "en" ? "bg-white text-red-600 shadow-sm" : "text-gray-500"
              }`}
              aria-pressed={locale === "en"}
            >
              English
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
