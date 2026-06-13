"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  GiftIcon,
  SparklesIcon,
  ZapIcon,
} from "@/components/ui/Icons";

const trustIcons = [ZapIcon, SparklesIcon, GiftIcon];

export function TrustSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="bg-gray-50/80 py-16 sm:py-20"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="trust-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            {t.trust.title}
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            {t.trust.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.trust.cards.map((card, index) => {
            const Icon = trustIcons[index];
            return (
              <article
                key={card.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-red-100/50 sm:p-8"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
