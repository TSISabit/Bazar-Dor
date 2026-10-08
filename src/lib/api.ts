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
}

interface ApiResponse<T> {
  data?: T;
  products?: T;
  result?: T;
}

function extractArray(json: unknown): Product[] {
  if (Array.isArray(json)) {
    return json as Product[];
  }
  if (json && typeof json === "object") {
    const obj = json as ApiResponse<Product[]>;
    if (Array.isArray(obj.data)) return obj.data;
    if (Array.isArray(obj.products)) return obj.products;
    if (Array.isArray(obj.result)) return obj.result;
  }
  return [];
}

async function fetcher<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_1}${endpoint}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Base 1 failed");
    return (await res.json()) as T;
  } catch {
    const res = await fetch(`${BASE_2}${endpoint}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Base 2 failed");
    return (await res.json()) as T;
  }
}

export const getProducts = async (): Promise<Product[]> => {
  const json = await fetcher<unknown>("/products");
  return extractArray(json);
};

export const getProductById = async (id: string): Promise<Product> => {
  const json = await fetcher<Product | ApiResponse<Product>>(`/products/${id}`);
  if (json && typeof json === "object" && "data" in json && json.data) {
    return json.data;
  }
  return json as Product;
};

export const getCategories = async (): Promise<string[]> => {
  const json = await fetcher<string[] | ApiResponse<string[]>>("/categories");
  if (Array.isArray(json)) return json;
  if (json && typeof json === "object" && "data" in json && Array.isArray(json.data)) {
    return json.data;
  }
  return [];
};

export const getProductsByCategory = async (cat: string): Promise<Product[]> => {
  const json = await fetcher<unknown>(`/products?category=${cat}`);
  return extractArray(json);
};