"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  ActivityIcon,
  MapPinIcon,
  UsersIcon,
} from "@/components/ui/Icons";

const statIcons = [UsersIcon, MapPinIcon, ActivityIcon];

export function ImpactSection() {
  const { t } = useLanguage();

  return (
    <section
      className="bg-gray-50/80 py-16 sm:py-20"
      aria-labelledby="impact-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="impact-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            {t.impact.title}
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            {t.impact.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {t.impact.stats.map((stat, index) => {
            const Icon = statIcons[index];
            return (
              <article
                key={stat.label}
                className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm"
              >
                <div
                  className="pointer-events-none absolute -top-6 -end-6 h-24 w-24 rounded-full bg-red-50"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-3xl font-bold tracking-tight text-red-600 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-gray-600 sm:text-base">
                    {stat.label}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
