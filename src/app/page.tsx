import Image from "next/image";
import { getProducts, Product } from "@/lib/api";
import PriceTicker from "@/components/PriceTicker";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  let products: Product[] = [];

  try {
    const data = await getProducts();
    products = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  // Risers (Section A) - Top 6 highest percentage increase
  const risers = [...products]
    .sort((a, b) => (Number(b.change) || 0) - (Number(a.change) || 0))
    .slice(0, 6);

  // Fallers (Section B) - Top 6 highest percentage decrease
  const fallers = [...products]
    .sort((a, b) => (Number(a.change) || 0) - (Number(b.change) || 0))
    .slice(0, 6);

  return (
    <main className="pb-16" suppressHydrationWarning>
      {/* Price Ticker Strip */}
      <PriceTicker products={products} />

      {/* Hero / Banner Section */}
      <section className="bg-gradient-to-b from-emerald-50/70 to-white py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold mb-4 tracking-wide">
              দৈনন্দিন বাজার দর পর্যবেক্ষণ
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              সঠিক দামে কিনুন, <br />
              <span className="text-emerald-700">বাজার দর</span> জানুন প্রতিদিন।
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              কাঁচাবাজারের নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য ও সঠিক হালনাগাদ দর দেখুন এক ক্লিকেই।
            </p>
            <a
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm md:text-base px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="w-full max-w-sm md:max-w-md relative flex justify-center">
            <div className="w-72 h-72 sm:w-80 sm:h-80 relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর হিরো ব্যানার"
                fill
                sizes="(max-width: 768px) 288px, 320px"
                className="object-cover"
                priority
              />
            </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {fallers.map((p) => (
              <ProductCard key={`faller-${p.id}`} product={p} />
            ))}
          </div>
        </section>

        {/* Section C: সব পণ্য */}
        <section id="সব-পণ্য" className="pt-4 scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
            <p className="text-xs text-gray-500 mt-1">
              বাজারে উপলব্ধ সকল পণ্যের হালনাগাদ তালিকা
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={`all-${p.id}`} product={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}