"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [donor, setDonor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

      // 🚨 حماية: إذا البروفايل غير مكتمل
      if (!data?.profile_completed) {
        router.push("/profile");
        return;
      }

      setDonor(data);
      setLoading(false);
    }

    load();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  async function deleteAccount() {
    const confirmDelete = confirm(
      "هل أنت متأكد من حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه"
    );

    if (!confirmDelete) return;

    const { error: dbError } = await supabase
      .from("donors")
      .delete()
      .eq("user_id", user.id);

    if (dbError) {
      alert(dbError.message);
      return;
    }

    const { error: authError } = await supabase.auth.admin.deleteUser(
      user.id
    );

    if (authError) {
      alert("تم حذف البيانات لكن لم يتم حذف الحساب من النظام");
    }

    alert("تم حذف الحساب بنجاح");
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-md mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-3xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold">
            أهلاً {donor?.full_name}
          </h1>

          <p className="text-red-100 mt-2">
            لوحة التحكم في WaslDam
          </p>

          <div className="mt-4 inline-block bg-white/20 px-4 py-2 rounded-full">
             {donor?.blood_type}
          </div>
        </div>

        {/* INFO */}
        <div className="bg-white rounded-3xl p-5 shadow space-y-3">

          <div className="flex justify-between">
            <span className="text-gray-500">المدينة</span>
            <span className="font-semibold">{donor?.city}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">الحالة</span>
            <span
              className={`font-semibold ${
                donor?.available ? "text-green-600" : "text-gray-500"
              }`}
            >
              {donor?.available ? "متاح للتبرع" : "غير متاح"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">العمر</span>
            <span className="font-semibold">{donor?.age || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">آخر تبرع</span>
            <span className="font-semibold">
              {donor?.last_donation_date || "-"}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="space-y-3">

          <button
            onClick={() => router.push("/search")}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-bold"
          >
             البحث عن متبرع
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-bold"
          >
             تعديل الملف الشخصي
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-100 text-blue-700 py-3 rounded-xl font-bold"
          >
            الصفحة الرئيسية
          </button>

        </div>

        {/* DANGER ZONE */}
        <div className="space-y-3 pt-4 border-t">

          <button
            onClick={logout}
            className="w-full bg-red-100 text-red-700 py-3 rounded-xl font-bold"
          >
            تسجيل الخروج
          </button>

          <button
            onClick={deleteAccount}
            className="w-full bg-black text-white py-3 rounded-xl font-bold"
          >
            حذف الحساب نهائياً
          </button>

        </div>

      </div>
    </div>
  );
}