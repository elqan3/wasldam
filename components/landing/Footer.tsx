"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { DropletIcon } from "@/components/ui/Icons";

const footerLinks = [
  { key: "home" as const, href: "/" },
  { key: "register" as const, href: "/register" },
  { key: "search" as const, href: "/search" },
  { key: "about" as const, href: "#about" },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 rounded-lg"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white">
                <DropletIcon className="h-4 w-4" />
              </span>
              <span className="text-lg font-bold text-gray-900">{t.brand.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              {t.footer.mission}
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            aria-label={t.footer.links.about}
          >
            {footerLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
              >
                {t.footer.links[link.key]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6">
          <p className="text-center text-sm text-gray-400 sm:text-start">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
