const BASE_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_2 = "https://api.abcz.workers.dev/api/bazardor";

export interface BazarPrice {
  name: string;
  location?: string;
  price: number;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  unit?: string;
  change?: number;
  emoji?: string;
  category?: string;
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  bazarPrices?: BazarPrice[];
  [key: string]: unknown;
}

function normalizeProduct(item: Record<string, unknown>): Product {
  const name =
    (item.name as string) ||
    (item.product_name as string) ||
    (item.title as string) ||
    "পণ্য";

  const rawPrice =
    item.price ??
    item.todayPrice ??
    item.todays_price ??
    item.current_price ??
    item.market_price ??
    0;

  const rawChange =
    item.change ??
    item.change_percent ??
    item.change_percentage ??
    item.price_change ??
    item.percentage ??
    0;

  return {
    id: (item.id as string | number) || (item._id as string | number) || Math.random(),
    name,
    price: typeof rawPrice === "number" ? rawPrice : parseFloat(String(rawPrice)) || 0,
    change: typeof rawChange === "number" ? rawChange : parseFloat(String(rawChange)) || 0,
    unit: (item.unit as string) || (item.unit_name as string) || "প্রতি কেজি",
    emoji: (item.emoji as string) || (item.icon as string) || "🥬",
    category: (item.category as string) || "",
    description: (item.description as string) || "",
    minPrice: typeof item.minPrice === "number" ? item.minPrice : undefined,
    maxPrice: typeof item.maxPrice === "number" ? item.maxPrice : undefined,
    bazarPrices: Array.isArray(item.bazarPrices) ? (item.bazarPrices as BazarPrice[]) : undefined,
  };
}

function parseResponseData(raw: unknown): Product[] {
  if (!raw) return [];

  let list: unknown[] = [];
  if (Array.isArray(raw)) {
    list = raw;
  } else if (typeof raw === "object" && raw !== null) {
    const record = raw as Record<string, unknown>;
    if (Array.isArray(record.data)) list = record.data;
    else if (Array.isArray(record.products)) list = record.products;
    else if (Array.isArray(record.result)) list = record.result;
    else if (Array.isArray(record.items)) list = record.items;
  }

  return list.map((item) => normalizeProduct(item as Record<string, unknown>));
}

async function requestApi(endpoint: string): Promise<unknown> {
  try {
    const res = await fetch(`${BASE_1}${endpoint}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Base 1 failed");
    return await res.json();
  } catch {
    const res = await fetch(`${BASE_2}${endpoint}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Base 2 failed");
    return await res.json();
  }
}

export const getProducts = async (): Promise<Product[]> => {
  const json = await requestApi("/products");
  return parseResponseData(json);
};

export const getProductById = async (id: string): Promise<Product> => {
  const json = (await requestApi(`/products/${id}`)) as Record<string, unknown>;
  if (json && typeof json === "object" && json.data) {
    return normalizeProduct(json.data as Record<string, unknown>);
  }
  return normalizeProduct(json);
};

export const getCategories = async (): Promise<string[]> => {
  const json = (await requestApi("/categories")) as Record<string, unknown>;
  if (Array.isArray(json)) return json as string[];
  if (json && Array.isArray(json.data)) return json.data as string[];
  return [];
};

export const getProductsByCategory = async (cat: string): Promise<Product[]> => {
  const json = await requestApi(`/products?category=${cat}`);
  return parseResponseData(json);
};