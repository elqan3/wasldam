"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type RegisterForm = {
  
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

if (form.phone.trim().length < 9) {
  alert("يرجى إدخال رقم هاتف صحيح");
  return;
}

setLoading(true);

try {
  const phone = form.phone.trim();
  const generatedEmail = `${phone}@wasldam.local`;

  const { data, error: authError } = await supabase.auth.signUp({
    email: generatedEmail,
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

  const { error: insertError } = await supabase.from("donors").insert({
    user_id: user.id,
    full_name: form.full_name,
    phone: phone,
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

  alert("تم إنشاء الحساب بنجاح");
  router.replace("/profile");

} catch (error) {
  console.error(error);
  alert("حدث خطأ غير متوقع");
} finally {
  setLoading(false);
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
  type="tel"
  name="phone"
  placeholder="رقم الهاتف"
  value={form.phone}
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
  <option>بنغازي</option>
  <option>مصراتة</option>
  <option>الزاوية</option>
  <option>الخمس</option>
  <option>زليتن</option>
  <option>صبراتة</option>
  <option>صرمان</option>
  <option>العجيلات</option>
  <option>غريان</option>
  <option>الزنتان</option>
  <option>يفرن</option>
  <option>نالوت</option>
  <option>سبها</option>
  <option>أوباري</option>
  <option>مرزق</option>
  <option>الشاطئ</option>
  <option>سرت</option>
  <option>أجدابيا</option>
  <option>البيضاء</option>
  <option>درنة</option>
  <option>طبرق</option>
  <option>المرج</option>
  <option>شحات</option>
  <option>الكفرة</option>
  <option>تازربو</option>
  <option>جالو</option>
  <option>هون</option>
  <option>ودان</option>
  <option>سوكنة</option>
  <option>رقدالين</option>
  <option>زوارة</option>
  <option>بني وليد</option>
</select>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition disabled:opacity-50"
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب متبرع"}
          </button>
<div className="text-center pt-2">

  <p className="text-gray-600">

    لديك حساب بالفعل؟

  </p>

  <Link

    href="/login"

    className="inline-block mt-2 text-red-600 font-bold hover:text-red-700"

  >

    تسجيل الدخول

  </Link>

</div>
        </div>
      </div>
    </div>
  );
}
