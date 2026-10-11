import { getProducts, Product } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";

export default async function PriceTicker() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  if (!products.length) return null;

  const renderTickerList = () => (
    <div className="flex items-center shrink-0 animate-marquee">
      {products.map((item, idx) => {
        const changeNum = Number(item.change) || 0;
        const isUp = changeNum > 0;
        const isFlat = changeNum === 0;

        return (
          <div
            key={`${item.id}-${idx}`}
            className="flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm px-5 py-2.5 border-r border-gray-100 font-medium bg-white"
          >
            <span className="text-base">{item.emoji || "🥬"}</span>
            <span className="text-gray-800 font-semibold">{item.name}</span>
            <span className="text-gray-600">
              {toBengaliNumber(item.price)} টাকা/{item.unit || "কেজি"}
            </span>
            <span
              className={`font-bold flex items-center gap-0.5 ml-1 ${
                isFlat
                  ? "text-gray-400"
                  : isUp
                  ? "text-rose-600"
                  : "text-emerald-600"
              }`}
            >
              {isFlat ? "—" : isUp ? "▲" : "▼"}{" "}
              {toBengaliNumber(Math.abs(changeNum))}%
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="ticker-wrapper w-full bg-white border-y border-gray-200 overflow-hidden select-none sticky top-0 z-30 shadow-xs flex">
      {/* Track 1 */}
      {renderTickerList()}
      {/* Track 2 - Infinite seamless loop */}
      {renderTickerList()}
    </div>
  );
}