import { toBengaliNumber } from "@/lib/utils";
import { Product } from "@/lib/api";

export default function PriceTicker({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div
      className="bg-emerald-950 text-emerald-100 overflow-hidden py-2 whitespace-nowrap text-xs border-y border-emerald-900"
      suppressHydrationWarning
    >
      <div className="animate-marquee flex gap-8" suppressHydrationWarning>
        {products.map((item, idx) => {
          const changeVal = Number(item.change) || 0;
          const isUp = changeVal > 0;
          const isFlat = changeVal === 0;

          return (
            <span
              key={`${item.id}-${idx}`}
              className="inline-flex items-center gap-1.5 font-medium"
              suppressHydrationWarning
            >
              <span className="text-sm">{item.emoji || "🛍️"}</span>
              <span>{item.name}</span>
              <span className="text-gray-300">
                {toBengaliNumber(item.price)} টাকা/{item.unit || "কেজি"}
              </span>
              <span
                className={`font-semibold ${
                  isFlat
                    ? "text-gray-400"
                    : isUp
                    ? "text-rose-400"
                    : "text-emerald-400"
                }`}
              >
                {isFlat
                  ? "—০.০%"
                  : isUp
                  ? `▲ ${toBengaliNumber(changeVal)}%`
                  : `▼ ${toBengaliNumber(Math.abs(changeVal))}%`}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}