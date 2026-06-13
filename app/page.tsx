import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
//import { ImpactSection } from "@/components/landing/ImpactSection";
import { TrustSection } from "@/components/landing/TrustSection";
import Image from "next/image";
// 🧠 صفحة رئيسية ذكية: توجه المستخدم حسب حالته
export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  // 👇 لو المستخدم مسجل → يذهب مباشرة للتطبيق
  if (user) {
    redirect("/dashboard");
  }

  // 👇 لو زائر → صفحة الهبوط
  return (
    <>
      <Header />

      <main>
        <Hero />
        <TrustSection />
        <HowItWorks />
 
        <CTASection />
      </main>

      <Footer />
    </>
  );
}