"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  MessageCircleIcon,
  SearchIcon,
  UserPlusIcon,
} from "@/components/ui/Icons";

const stepIcons = [UserPlusIcon, SearchIcon, MessageCircleIcon];

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section
      className="bg-white py-16 sm:py-20"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            {t.howItWorks.title}
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="relative mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6">
          <div
            className="pointer-events-none absolute top-16 hidden h-0.5 bg-gradient-to-r from-red-100 via-red-200 to-red-100 lg:block lg:w-[calc(100%-8rem)] lg:start-16"
            aria-hidden="true"
          />

          {t.howItWorks.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <article
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -top-2 -end-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-red-600 shadow-md ring-2 ring-red-50">
                    {index + 1}
                  </span>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                    {step.description}
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
