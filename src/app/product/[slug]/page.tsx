import { Suspense } from "react";
import ProductDetailContent from "./ProductDetailContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
          <span className="loading loading-spinner loading-lg text-emerald-600"></span>
          <p className="text-sm text-gray-500">পণ্যের বিবরণ লোড হচ্ছে...</p>
        </div>
      }
    >
      <ProductDetailContent params={params} />
    </Suspense>
  );
}