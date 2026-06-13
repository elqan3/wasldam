"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type RegisterForm = {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  blood_type: string;
  city: string;
};

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    full_name: "",
    phone: "",
    blood_type: "A+",
    city: "ترهونة",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister() {
    // Validation
    if (
      !form.email.trim() ||
      !form.password.trim() ||
      !form.full_name.trim() ||
      !form.phone.trim()
    ) {
      alert("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    if (form.password.length < 6) {
      alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    setLoading(true);

    try {
      // 1. إنشاء الحساب
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        alert(authError.message);
        setLoading(false);
        return;
      }

      const user = data?.user;

      if (!user) {
        alert("فشل إنشاء الحساب، حاول مرة أخرى");
        setLoading(false);
        return;
      }

      // 2. إنشاء سجل المتبرع
      const { error: insertError } = await supabase.from("donors").insert({
        user_id: user.id,
        full_name: form.full_name,
        phone: form.phone,
        blood_type: form.blood_type,
        city: form.city,
        available: true,
        profile_completed: false,
        updated_at: new Date(),
      });

      if (insertError) {
        alert(insertError.message);
        setLoading(false);
        return;
      }

     // 3. نجاح
alert("تم إنشاء الحساب بنجاح");

// 4. تحويل مباشر للبروفايل
router.replace("/profile");

} catch (error: unknown) {
  console.error(error);
  alert("حدث خطأ غير متوقع");
} finally {
  setLoading(false);
}
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-3xl p-6 shadow-lg mb-6">
          <h1 className="text-3xl font-bold"> انضم إلى وصل دم</h1>
          <p className="mt-2 text-red-100">
            ساعد في إنقاذ الأرواح عبر التبرع بالدم
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">

          <input
            name="full_name"
            placeholder="الاسم الكامل"
            value={form.full_name}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-red-500"
          />

          <input
            name="phone"
            placeholder="رقم الهاتف"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-red-500"
          />

          <input
            name="email"
            type="email"
            placeholder="البريد الإلكتروني"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-red-500"
          />

          <input
            name="password"
            type="password"
            placeholder="كلمة المرور"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-red-500"
          />

          <select
            name="blood_type"
            value={form.blood_type}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          >
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          >
            <option>ترهونة</option>
            <option>طرابلس</option>
            <option>مصراتة</option>
            <option>بنغازي</option>
            <option>الخمس</option>
            <option>الزاوية</option>
          </select>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition disabled:opacity-50"
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب متبرع"}
          </button>

        </div>
      </div>
    </div>
  );
}