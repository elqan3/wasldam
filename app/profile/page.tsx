"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function ProfilePage() {
  const router = useRouter();

const [user, setUser] = useState<User | null>(null);
const [donorId, setDonorId] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    blood_type: "A+",
    city: "ترهونة",
    available: true,
    age: "",
    last_donation_date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      const currentUser = userData?.user;

      if (!currentUser) {
        router.push("/");
        return;
      }

      setUser(currentUser);

      const { data } = await supabase
        .from("donors")
        .select("*")
        .eq("user_id", currentUser.id)
        .single();

      if (data) {
        setDonorId(data.id);
        setForm({
          full_name: data.full_name || "",
          phone: data.phone || "",
          blood_type: data.blood_type || "A+",
          city: data.city || "ترهونة",
          available: data.available ?? true,
          age: data.age ? String(data.age) : "",
          last_donation_date: data.last_donation_date || "",
          notes: data.notes || "",
        });
      }

      setLoading(false);
    }

    load();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleAvailable() {
    setForm((prev) => ({ ...prev, available: !prev.available }));
  }

  async function saveChanges() {
    if (!donorId) return;

    if (!form.full_name.trim() || !form.phone.trim()) {
      alert("الاسم ورقم الهاتف مطلوبان");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("donors")
      .update({
        full_name: form.full_name,
        phone: form.phone,
        blood_type: form.blood_type,
        city: form.city,
        available: form.available,

        age: form.age ? Number(form.age) : null,
        last_donation_date: form.last_donation_date || null,
        notes: form.notes || null,

        profile_completed: true,
        updated_at: new Date(),
      })
      .eq("id", donorId);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("تم حفظ الملف الشخصي ");
    router.push("/dashboard");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">جاري تحميل الملف...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      <div className="max-w-md mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-3xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold"> الملف الشخصي</h1>
          <p className="text-red-100 mt-1">
            أكمل بياناتك لتكون متبرع جاهز
          </p>

          <div className="mt-4 inline-block bg-white/20 px-4 py-2 rounded-full">
            {form.available ? "🟢 متاح للتبرع" : "🔴 غير متاح"}
          </div>
        </div>

        {/* INFO CARD */}
        <div className="bg-white rounded-3xl p-5 shadow space-y-2">
          <div className="flex justify-between">
            <span>الاسم</span>
            <span className="font-bold">{form.full_name || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span>فصيلة الدم</span>
            <span className="font-bold">{form.blood_type}</span>
          </div>

          <div className="flex justify-between">
            <span>المدينة</span>
            <span className="font-bold">{form.city}</span>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-3xl p-5 shadow space-y-3">

          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="الاسم الكامل"
            className="w-full border rounded-xl p-3"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="رقم الهاتف"
            className="w-full border rounded-xl p-3"
          />

          <select
            name="blood_type"
            value={form.blood_type}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
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
            className="w-full border rounded-xl p-3"
          >
            <option>ترهونة</option>
            <option>طرابلس</option>
            <option>مصراتة</option>
            <option>بنغازي</option>
            <option>الخمس</option>
            <option>الزاوية</option>
          </select>

          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="العمر"
            className="w-full border rounded-xl p-3"
          />
<h1>تاريخ اخر تبرع :</h1>
          <input 
            type="date"
            name="last_donation_date"
            value={form.last_donation_date}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
<h1>اكتب اي ملاحظات (مثلا ان كنت مدخن او تتبرع للنساء فقط او تتوفر في وقت محدد):</h1>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="ملاحظات"
            className="w-full border rounded-xl p-3"
            rows={3}
          />

          <button
            onClick={toggleAvailable}
            className={`w-full py-3 rounded-xl text-white font-bold ${
              form.available ? "bg-green-600" : "bg-gray-500"
            }`}
          >
            {form.available ? "🟢 متاح" : "🔴 غير متاح"}
          </button>

          <button
            onClick={saveChanges}
            disabled={saving}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-bold"
          >
            {saving ? "جاري الحفظ..." : " حفظ وإكمال الملف"}
          </button>
        </div>

        {/* ACTIONS */}
        <div className="space-y-3">

          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-gray-100 py-3 rounded-xl"
          >
             الذهاب للوحة التحكم
          </button>

          <button
            onClick={() => router.push("/search")}
            className="w-full bg-blue-100 text-blue-700 py-3 rounded-xl"
          >
            🔍 البحث عن متبرع
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-100 text-red-700 py-3 rounded-xl"
          >
             تسجيل الخروج
          </button>

        </div>

      </div>
    </div>
  );
}