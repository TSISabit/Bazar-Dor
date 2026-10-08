import { toBengaliNumber } from "@/lib/utils";

interface Product {
  id: string | number;
  name: string;
  price: number;
  unit?: string;
  change?: number;
  emoji?: string;
}

export default function PriceTicker({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-emerald-950 text-emerald-100 overflow-hidden py-2 whitespace-nowrap text-xs border-y border-emerald-900">
      <div className="animate-marquee flex gap-8">
        {products.map((item, idx) => {
          const changeVal = item.change ?? 0;
          const isUp = changeVal > 0;
          const isFlat = changeVal === 0;

          return (
            <span key={`${item.id}-${idx}`} className="inline-flex items-center gap-1.5 font-medium">
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
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                {isFlat ? "—০.০%" : isUp ? `▲ ${toBengaliNumber(changeVal)}%` : `▼ ${toBengaliNumber(Math.abs(changeVal))}%`}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}