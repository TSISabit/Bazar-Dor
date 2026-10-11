import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, Product } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";

interface MarketItem {
  market: string;
  division: string;
  min: number;
  max: number;
  avg: number;
}

interface ExtendedProduct extends Product {
  markets?: MarketItem[];
  categorySlug?: string;
}

const dummyMarkets: MarketItem[] = [
  { market: "মাঠ বাজার", division: "ময়মনসিংহ", min: 132, max: 146, avg: 139 },
  { market: "সদর বাজার", division: "রাজশাহী", min: 134, max: 148, avg: 141 },
  { market: "বাঘারহাট", division: "খুলনা", min: 134, max: 151, avg: 142.5 },
  { market: "বাসারহাট বাজার", division: "রাজশাহী", min: 135, max: 152, avg: 143.5 },
  { market: "চৌর বাজার", division: "ময়মনসিংহ", min: 135, max: 155, avg: 145 },
  { market: "আমতলী বাজার", division: "চট্টগ্রাম", min: 138, max: 155, avg: 146.5 },
  { market: "ডাবলগেট বাজার", division: "খুলনা", min: 139, max: 154, avg: 146.5 },
  { market: "চৌরাস্তা বাজার", division: "সিলেট", min: 141, max: 158, avg: 149.5 },
  { market: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", min: 143, max: 159, avg: 151 },
  { market: "চট্টগ্রাম বাজার", division: "চট্টগ্রাম", min: 142, max: 163, avg: 152.5 },
  { market: "আমবাজার", division: "সিলেট", min: 143, max: 165, avg: 154 },
  { market: "কারওয়ান বাজার", division: "ঢাকা", min: 146, max: 165, avg: 155.5 },
];

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let rawProduct: Product | null = null;
  try {
    rawProduct = await getProductById(id);
  } catch (err) {
    console.error("Error fetching product:", err);
  }

  if (!rawProduct) {
    notFound();
  }

  const product = rawProduct as ExtendedProduct;

  const changeNum = Number(product.change) || 0;
  const isUp = changeNum > 0;
  const isFlat = changeNum === 0;

  const basePrice = Number(product.price) || 100;
  const markets: MarketItem[] =
    product.markets && product.markets.length > 0
      ? product.markets
      : dummyMarkets.map((m) => ({
          ...m,
          min: Math.round(basePrice * 0.92),
          max: Math.round(basePrice * 1.08),
          avg: Math.round(basePrice),
        }));

  const minPrice = Math.min(...markets.map((m: MarketItem) => m.min));
  const maxPrice = Math.max(...markets.map((m: MarketItem) => m.max));
  const avgPrice = Math.round(
    markets.reduce((acc: number, m: MarketItem) => acc + m.avg, 0) /
      markets.length
  );

  const categoryPath = product.categorySlug || product.category || "chal";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-700">
          হোম
        </Link>
        <span>›</span>
        <Link href={`/category/${categoryPath}`} className="hover:text-emerald-700">
          {product.category || "ক্যাটাগরি"}
        </Link>
        <span>›</span>
        <span className="text-gray-800 font-semibold">{product.name}</span>
      </nav>

      {/* Top Product Summary */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-4xl shadow-inner">
            {product.emoji || "🍚"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              প্রতি {product.unit || "কেজি"} - {product.category || "পণ্য"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              গতকালের তুলনায় আজ দাম{" "}
              {isFlat ? "অপরিবর্তিত" : isUp ? "বেড়েছে" : "কমেছে"}{" "}
              {toBengaliNumber(Math.abs(changeNum))}%
            </p>
          </div>
        </div>

        <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4 sm:text-right min-w-[140px]">
          <span className="text-xs text-gray-400 block font-medium">আজকের দাম</span>
          <span className="text-2xl font-black text-gray-900 block leading-tight">
            {toBengaliNumber(product.price)}
          </span>
          <span className="text-xs text-gray-500 block">
            টাকা / {product.unit || "কেজি"}
          </span>
          <div
            className={`inline-flex items-center gap-1 text-xs font-bold mt-1.5 ${
              isFlat
                ? "text-gray-500"
                : isUp
                ? "text-rose-600"
                : "text-emerald-600"
            }`}
          >
            <span>{isFlat ? "—" : isUp ? "▲" : "▼"}</span>
            <span>{toBengaliNumber(Math.abs(changeNum))}%</span>
          </div>
        </div>
      </div>

      {/* Statistics and Market Table */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
        <div>
          <h2 className="text-base font-bold text-gray-800 mb-4">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-2xs">
              <span className="text-xs text-gray-400 block font-medium">
                সর্বনিম্ন দাম
              </span>
              <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">
                {toBengaliNumber(minPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400 mt-1 block">
                সবচেয়ে কম দামের বাজার
              </span>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-2xs">
              <span className="text-xs text-gray-400 block font-medium">
                সর্বাধিক দাম
              </span>
              <span className="text-2xl font-extrabold text-rose-500 mt-1 block">
                {toBengaliNumber(maxPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400 mt-1 block">
                সবচেয়ে বেশি দামের বাজার
              </span>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-2xs">
              <span className="text-xs text-gray-400 block font-medium">
                গড় দাম
              </span>
              <span className="text-2xl font-extrabold text-teal-600 mt-1 block">
                {toBengaliNumber(avgPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400 mt-1 block">
                প্রতি {product.unit || "কেজি"}-এর হিসাবে
              </span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-800 mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                  <th className="py-3 px-3">বাজার</th>
                  <th className="py-3 px-3">বিভাগ</th>
                  <th className="py-3 px-3 text-right">সর্বনিম্ন</th>
                  <th className="py-3 px-3 text-right">সর্বাধিক</th>
                  <th className="py-3 px-3 text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
                {markets.map((item: MarketItem, idx: number) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-3 text-gray-900 font-semibold">
                      {item.market}
                    </td>
                    <td className="py-3.5 px-3 text-gray-500">
                      {item.division}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {toBengaliNumber(item.min)} টাকা
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {toBengaliNumber(item.max)} টাকা
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold text-gray-900">
                      {toBengaliNumber(item.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="pt-2">
        <Link
          href={`/category/${categoryPath}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-700 transition-colors"
        >
          <span>{product.emoji || "🏷️"}</span> সব {product.category || "পণ্য"}
        </Link>
      </div>
    </div>
  );
}