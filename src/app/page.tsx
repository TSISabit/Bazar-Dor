import Image from "next/image";
import { getProducts, Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import AllProductsSection from "@/components/AllProductsSection";

export default async function HomePage() {
  let products: Product[] = [];

  try {
    const data = await getProducts();
    products = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  // Risers (Section A) - Top 6
  const risers = [...products]
    .sort((a, b) => (Number(b.change) || 0) - (Number(a.change) || 0))
    .slice(0, 6);

  // Fallers (Section B) - Top 6
  const fallers = [...products]
    .sort((a, b) => (Number(a.change) || 0) - (Number(b.change) || 0))
    .slice(0, 6);

  return (
    <main className="pb-16" suppressHydrationWarning>
      {/* Hero / Banner Section */}
      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-xs p-6 sm:p-10 md:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-left">
            <span className="inline-block bg-emerald-50 text-emerald-800 text-xs px-3.5 py-1 rounded-full font-medium mb-4">
              রবিবার, ১১ অক্টোবর, ২০২৬
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-3">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-normal">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-xs"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="w-48 h-48 sm:w-60 sm:h-60 relative shrink-0">
            <Image
              src="/bazar-hero.png"
              alt="বাজার দর হিরো ব্যানার"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Product Sections Container */}
      <div className="max-w-6xl mx-auto px-4 mt-12 space-y-14">
        {/* Section A: আজ দাম বেড়েছে */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">আজ দাম বেড়েছে</h2>
            <span className="text-rose-600 font-bold text-lg">▲</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {risers.map((p) => (
              <ProductCard key={`riser-${p.id}`} product={p} />
            ))}
          </div>
        </section>

        {/* Section B: আজ দাম কমেছে */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">আজ দাম কমেছে</h2>
            <span className="text-emerald-600 font-bold text-lg">▼</span>
          </div>
          {/* Mobile: 1, Tab: 2, PC: 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {fallers.map((p) => (
              <ProductCard key={`faller-${p.id}`} product={p} />
            ))}
          </div>
        </section>

        {/* Section C: সব পণ্য */}
        <AllProductsSection initialProducts={products} />
      </div>
    </main>
  );
}