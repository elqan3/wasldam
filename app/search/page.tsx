"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Donor = {
  id: string;
  full_name: string;
  phone: string;
  blood_type: string;
  city: string;
  available: boolean;
  age: number | null;
  last_donation_date: string | null;
  notes: string | null;
};

export default function SearchPage() {
  const [bloodType, setBloodType] = useState("A+");
  const [city, setCity] = useState("ترهونة");
  const [results, setResults] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);

  function isEligible(lastDate: string | null) {
    if (!lastDate) return true;

    const last = new Date(lastDate);
    const now = new Date();

    const diffDays =
      (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);

    return diffDays >= 56;
  }

  function formatPhone(phone: string) {
    return phone.replace(/\s/g, "");
  }

  async function search() {
    setLoading(true);

    const { data, error } = await supabase
      .from("donors")
      .select("*")
      .eq("blood_type", bloodType)
      .eq("city", city);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const filtered = (data || [])
      .filter(
        (d: Donor) =>
          d.available && isEligible(d.last_donation_date)
      )
      .sort((a: Donor, b: Donor) => {
        if (!a.last_donation_date) return -1;
        if (!b.last_donation_date) return 1;

        return (
          new Date(a.last_donation_date).getTime() -
          new Date(b.last_donation_date).getTime()
        );
      });

    setResults(filtered);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      {/* HEADER */}
      <div className="max-w-md mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          البحث عن متبرع
        </h1>

        <p className="text-gray-500 mt-1">
          نظام ذكي يطابق حسب الفصيلة والجاهزية
        </p>
      </div>

      {/* FILTERS */}
      <div className="max-w-md mx-auto bg-white p-5 rounded-2xl shadow space-y-3">
        <select
          className="w-full border rounded-xl p-3"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
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
          className="w-full border rounded-xl p-3"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
  <option>طرابلس</option>
  <option>ترهونة</option>
  <option>قصر ألأخيار</option>
  <option>بنغازي</option>
  <option>مصراتة</option>
  <option>الزاوية</option>
  <option>العواتة</option>
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
          onClick={search}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition disabled:opacity-50"
        >
          {loading ? "جاري البحث..." : "بحث عن متبرع"}
        </button>
      </div>

      {/* RESULTS */}
      <div className="max-w-md mx-auto mt-6 space-y-4">
        {!loading && results.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            لا يوجد متبرعون متاحون حالياً
          </div>
        )}

        {results.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl shadow p-5 border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {d.full_name}
                </h2>

                <p className="text-sm text-gray-500">
                  {d.city}
                </p>

                {d.age && (
                  <p className="text-sm text-gray-600">
                    {d.age} سنة
                  </p>
                )}

                {d.notes && (
                  <p className="text-xs text-gray-500 mt-1">
                    {d.notes}
                  </p>
                )}
              </div>

              <div className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                جاهز
              </div>
            </div>

            <div className="mt-3">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                🩸 {d.blood_type}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-3">
              📞 {d.phone}
            </p>

            <div className="flex gap-2 mt-4">
              <a
                href={`tel:${formatPhone(d.phone)}`}
                className="flex-1 bg-green-600 text-white text-center py-2 rounded-xl font-semibold"
              >
                اتصال
              </a>

              <a
                href={`https://wa.me/${formatPhone(d.phone)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 text-white text-center py-2 rounded-xl font-semibold"
              >
                واتساب
              </a>

              <button
                onClick={() => navigator.clipboard.writeText(d.phone)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl font-semibold"
              >
                نسخ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
