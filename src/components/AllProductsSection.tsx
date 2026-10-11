"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

interface AllProductsSectionProps {
  initialProducts: Product[];
}

export default function AllProductsSection({
  initialProducts,
}: AllProductsSectionProps) {
  const [sortOption, setSortOption] = useState<"default" | "asc" | "desc">(
    "default"
  );

  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortOption === "asc") {
      return list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    }
    if (sortOption === "desc") {
      return list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }
    return list;
  }, [initialProducts, sortOption]);

  return (
    <section id="সব-পণ্য" className="space-y-6">
      {/* Header with Title and Sorting Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            বাজারে উপলব্ধ সকল পণ্যের হালনাগাদ দর
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <label
            htmlFor="sort-select"
            className="text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap"
          >
            সাজান:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value as "default" | "asc" | "desc")
            }
            className="select select-sm bg-white border border-gray-300 text-gray-800 text-xs sm:text-sm rounded-lg focus:outline-none focus:border-emerald-600 font-medium"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Responsive Products Grid: Mobile: 1, Tab: 2, PC: 3 */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={`all-${product.id}`} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
          <p className="text-gray-500 text-sm">কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      )}
    </section>
  );
}