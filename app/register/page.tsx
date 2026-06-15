"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setLoading(true);
    setError("");

    const generatedEmail = `${phone}@wasldam.local`;

const { data, error } = await supabase.auth.signInWithPassword({
  email: generatedEmail,
  password,
});

    if (error) {
      setError("رقم الهاتف أو كلمة المرور غير صحيحة");
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/profile");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-2 text-center">
          تسجيل الدخول 
        </h1>

        <p className="text-gray-500 text-center mb-6">
          ادخل بيانات حسابك للوصول إلى ملفك الشخصي
        </p>

        <div className="space-y-3">

          <input
  type="tel"
  placeholder="رقم الهاتف"
  className="w-full border p-2 rounded"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-red-600 text-white p-2 rounded"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-3">
            ليس لديك حساب؟{" "}
            <a href="/register" className="text-red-600">
              سجل الآن
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
