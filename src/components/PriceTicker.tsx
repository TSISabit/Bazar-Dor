import { toBengaliNumber } from "@/lib/utils";
import { Product } from "@/lib/api";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-emerald-950 text-emerald-100 overflow-hidden py-2 whitespace-nowrap text-xs border-y border-emerald-900">
      <div className="animate-marquee flex gap-8">
        {products.map((item, idx) => {
          const name = item.name || "পণ্য";
          const price = Number(item.price) || 0;
          const changeVal = Number(item.change) || 0;
          const unit = item.unit || "কেজি";
          const emoji = item.emoji || "🛍️";

          const isUp = changeVal > 0;
          const isFlat = changeVal === 0;

          return (
            <span key={`${item.id}-${idx}`} className="inline-flex items-center gap-1.5 font-medium">
              <span className="text-sm">{emoji}</span>
              <span>{name}</span>
              <span className="text-gray-300">
                {toBengaliNumber(price)} টাকা/{unit}
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