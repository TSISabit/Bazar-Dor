"use client";

import { useState } from "react";
import { Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

interface AllProductsSectionProps {
  initialProducts: Product[];
}

export default function AllProductsSection({ initialProducts }: AllProductsSectionProps) {
  const [sortOption, setSortOption] = useState<"default" | "asc" | "desc">("default");

  const sortedProducts = [...initialProducts].sort((a, b) => {
    const priceA = Number(a.price) || 0;
    const priceB = Number(b.price) || 0;

    if (sortOption === "asc") return priceA - priceB;
    if (sortOption === "desc") return priceB - priceA;
    return 0;
  });

  return (
    <section id="সব-পণ্য" className="pt-4 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
          <p className="text-xs text-gray-500 mt-1">
            বাজারে উপলব্ধ সকল পণ্যের হালনাগাদ তালিকা
          </p>
        </div>

        {/* সাজান ড্রপডাউন কন্ট্রোল */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label htmlFor="sortSelect" className="text-xs font-medium text-gray-600">
            সাজান:
          </label>
          <select
            id="sortSelect"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as "default" | "asc" | "desc")}
            className="select select-bordered select-sm text-xs rounded-xl border-gray-300 focus:border-emerald-600 focus:outline-none bg-white font-medium"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি ▴</option>
            <option value="desc">দাম: বেশি থেকে কম ▾</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((p) => (
          <ProductCard key={`all-${p.id}`} product={p} />
        ))}
      </div>
    </section>
  );
}