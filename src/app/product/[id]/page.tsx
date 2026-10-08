"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getProductById, Product } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";
import { ArrowLeft, Store, TrendingUp, TrendingDown } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: session, isPending } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Authentication Guard
  useEffect(() => {
    if (!isPending && !session) {
      router.push(`/signin?callbackUrl=/product/${id}`);
    }
  }, [session, isPending, router, id]);

  useEffect(() => {
    async function fetchDetail() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (isPending || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
        <p className="text-sm text-gray-500">পণ্যের বিবরণ লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session) return null;

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">পণ্যটি পাওয়া যায়নি</h2>
        <Link href="/" className="btn btn-sm bg-emerald-600 text-white border-none">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const changeVal = Number(product.change) || 0;
  const isUp = changeVal > 0;
  const isFlat = changeVal === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-700 font-medium hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> বাজারে ফিরে যান
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="text-5xl bg-emerald-50 border border-emerald-100 w-20 h-20 rounded-2xl flex items-center justify-center">
              {product.emoji || "🥬"}
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                {product.category || "নিত্যপণ্য"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-0.5">
                {product.name}
              </h1>
              <p className="text-xs text-gray-500 mt-1">পরিমাপ: {product.unit || "কেজি"}</p>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-gray-400 block font-medium">আজকের বাজার দর</span>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              {toBengaliNumber(product.price)} টাকা
            </div>
            <div
              className={`inline-flex items-center gap-1 text-xs font-semibold mt-1 px-2.5 py-0.5 rounded-full ${
                isFlat
                  ? "bg-gray-100 text-gray-600"
                  : isUp
                  ? "bg-rose-50 text-rose-600"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {isFlat ? null : isUp ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {isFlat
                ? "— ০.০%"
                : isUp
                ? `▲ ${toBengaliNumber(changeVal)}% বৃদ্ধি`
                : `▼ ${toBengaliNumber(Math.abs(changeVal))}% হ্রাস`}
            </div>
          </div>
        </div>

        {/* বিভিন্ন বাজারের দামের তুলনা */}
        <div className="mt-8">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-600" /> বিভিন্ন বাজারের তুলনা
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { bazar: "কাওরান বাজার", diff: -3 },
              { bazar: "মোহাম্মদপুর টাউন হল", diff: 2 },
              { bazar: "মিরপুর ১ নম্বর বাজার", diff: 0 },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 flex justify-between items-center"
              >
                <span className="text-xs font-medium text-gray-700">{item.bazar}</span>
                <span className="text-sm font-bold text-gray-900">
                  {toBengaliNumber(product.price + item.diff)} ৳
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}