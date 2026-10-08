const BASE_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_2 = "https://api.abcz.workers.dev/api/bazardor";

async function fetcher(endpoint: string) {
  try {
    const res = await fetch(`${BASE_1}${endpoint}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Base 1 error");
    return await res.json();
  } catch {
    const res = await fetch(`${BASE_2}${endpoint}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Base 2 error");
    return await res.json();
  }
}

export const getProducts = () => fetcher("/products");
export const getProductById = (id: string) => fetcher(`/products/${id}`);
export const getCategories = () => fetcher("/categories");
export const getProductsByCategory = (cat: string) => fetcher(`/products?category=${cat}`);