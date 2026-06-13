import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

        {/* النص */}
        <div className="flex-1 text-center md:text-right space-y-6">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            تبرع بالدم وأنقذ حياة 
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            منصة ذكية تربط المتبرعين بالمرضى في ليبيا بسرعة وسهولة، وتساعد في إنقاذ الأرواح عند الحاجة.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">

            <Link
              href="/register"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              ابدأ الآن
            </Link>

            <Link
              href="/search"
              className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl font-bold transition"
            >
              البحث عن متبرع
            </Link>

          </div>

        </div>

        {/* الصورة الجانبية */}
        <div className="flex-1 flex justify-center">

          <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">

            <Image
              src="/hero.jpg"
              alt="WaslDam Hero Image"
              fill
              className="object-cover"
              priority
            />

          </div>

        </div>

      </div>
    </section>
  );
}