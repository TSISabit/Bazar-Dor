"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Product } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { data: session } = useSession();

  const changeNum = Number(product.change) || 0;
  const isUp = changeNum > 0;
  const isFlat = changeNum === 0;

  const handleClick = () => {
    if (!session) {
      toast.error("বিস্তারিত দেখতে আগে লগইন করুন");
      router.push(`/signin?callbackUrl=/product/${product.id}`);
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform">
          {product.emoji || "🥬"}
        </div>
        <h3 className="font-bold text-gray-900 text-base leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          প্রতি {product.unit || "কেজি"}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex items-end justify-between">
        <div>
          <span className="text-[11px] text-gray-400 block font-medium">
            আজকের দাম
          </span>
          <span className="text-lg font-extrabold text-gray-900">
            {toBengaliNumber(product.price)} টাকা
          </span>
        </div>

        <div
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
            isFlat
              ? "bg-gray-100 text-gray-500"
              : isUp
              ? "bg-rose-50 text-rose-600"
              : "bg-emerald-50 text-emerald-600"
          }`}
        >
          <span>{isFlat ? "—" : isUp ? "▲" : "▼"}</span>
          <span>{toBengaliNumber(Math.abs(changeNum))}%</span>
        </div>
      </div>
    </div>
  );
}