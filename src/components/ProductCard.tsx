import Link from "next/link";
import { toBengaliNumber } from "@/lib/utils";
import { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) return null;

  const id = product.id;
  const name = product.name || "পণ্য";
  const price = Number(product.price) || 0;
  const changeVal = Number(product.change) || 0;
  const unit = product.unit || "প্রতি কেজি";
  const emoji = product.emoji || "🥬";

  const isUp = changeVal > 0;
  const isFlat = changeVal === 0;

  return (
    <Link
      href={`/product/${id}`}
      className="card bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl p-4 flex flex-col justify-between group hover:-translate-y-0.5"
    >
      <div>
        <div className="text-4xl bg-gray-50 border border-gray-100/60 w-16 h-16 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
          {emoji}
        </div>
        <h3 className="font-semibold text-gray-800 text-base leading-snug line-clamp-1 mb-1">
          {name}
        </h3>
        <p className="text-xs text-gray-400 mb-4">{unit}</p>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-gray-400 block font-medium">আজকের দাম</span>
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            {toBengaliNumber(price)} টাকা
          </span>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
            isFlat
              ? "bg-gray-100 text-gray-600 border-gray-200"
              : isUp
              ? "bg-rose-50 text-rose-600 border-rose-200"
              : "bg-emerald-50 text-emerald-600 border-emerald-200"
          }`}
        >
          {isFlat
            ? "— ০.০%"
            : isUp
            ? `▲ ${toBengaliNumber(changeVal)}%`
            : `▼ ${toBengaliNumber(Math.abs(changeVal))}%`}
        </span>
      </div>
    </Link>
  );
}