"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { DropletIcon } from "@/components/ui/Icons";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section
      className="py-16 sm:py-20"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-red-600 px-6 py-14 text-center shadow-xl shadow-red-600/25 sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_50%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-8 -start-8 h-40 w-40 rounded-full bg-red-500/50 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-8 -end-8 h-40 w-40 rounded-full bg-red-700/50 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2
              id="cta-heading"
              className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
            >
              {t.cta.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-red-100 sm:text-lg">
              {t.cta.subtitle}
            </p>
            <div className="mt-8">
              <Button
                href="/register"
                variant="secondary"
                className="min-w-[200px] border-0 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 shadow-lg"
              >
                <DropletIcon className="h-4 w-4 text-red-600" />
                {t.cta.button}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
