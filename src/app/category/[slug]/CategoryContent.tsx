"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getProductsByCategory, Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { ArrowUpDown } from "lucide-react";

export default function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<"default" | "asc" | "desc">("default");

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await getProductsByCategory(slug);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load category products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = Number(a.price) || 0;
    const priceB = Number(b.price) || 0;

    if (sortOption === "asc") return priceA - priceB;
    if (sortOption === "desc") return priceB - priceA;
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-[70vh]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs text-gray-500 font-medium">ক্যাটাগরি</span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize flex items-center gap-2">
            🏷️ {slug}
          </h1>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <label htmlFor="sortSelect" className="text-xs text-gray-600 font-medium">
            সাজান:
          </label>
          <select
            id="sortSelect"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as "default" | "asc" | "desc")}
            className="select select-bordered select-sm text-xs rounded-lg border-gray-300 focus:border-emerald-600 focus:outline-none bg-white"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি ▴</option>
            <option value="desc">দাম: বেশি থেকে কম ▾</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-52 bg-gray-100 animate-pulse rounded-2xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-gray-200 rounded-xl mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                <div className="h-5 bg-gray-200 rounded w-1/3" />
                <div className="h-5 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && sortedProducts.length === 0 && (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="text-5xl mb-3">🔍</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            অন্য কোনো ক্যাটাগরি বা হোম পেজে অনুসন্ধান করুন।
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}

      {!loading && sortedProducts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((p) => (
            <ProductCard key={`cat-${p.id}`} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}