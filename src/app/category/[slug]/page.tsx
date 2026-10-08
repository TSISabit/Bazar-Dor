import { Suspense } from "react";
import CategoryContent from "./CategoryContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-8 min-h-[70vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-52 bg-gray-100 animate-pulse rounded-2xl p-4"
              />
            ))}
          </div>
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}