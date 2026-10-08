export interface BazarPrice {
  name: string;
  location?: string;
  price: number;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  unit: string;
  change: number;
  emoji: string;
  category?: string;
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  bazarPrices?: BazarPrice[];
}

const mockProducts: Product[] = [
  { id: 1, name: "নাজিরশাইল চাল", price: 78, unit: "কেজি", change: 4.2, emoji: "🍚", category: "chal" },
  { id: 2, name: "মিনিকেট চাল", price: 72, unit: "কেজি", change: -2.5, emoji: "🍚", category: "chal" },
  { id: 3, name: "মসুর ডাল (দেশি)", price: 140, unit: "কেজি", change: 3.1, emoji: "🥣", category: "dal" },
  { id: 4, name: "সয়াবিন তেল (বোতল)", price: 168, unit: "লিটার", change: -1.8, emoji: "🛢️", category: "oil" },
  { id: 5, name: "দেশি আলু", price: 55, unit: "কেজি", change: 6.5, emoji: "🥔", category: "vegetables" },
  { id: 6, name: "পেঁয়াজ (দেশি)", price: 110, unit: "কেজি", change: 8.2, emoji: "🧅", category: "vegetables" },
  { id: 7, name: "টমেটো", price: 90, unit: "কেজি", change: -5.0, emoji: "🍅", category: "vegetables" },
  { id: 8, name: "কাঁচা মরিচ", price: 180, unit: "কেজি", change: 12.5, emoji: "🌶️", category: "vegetables" },
  { id: 9, name: "রুই মাছ", price: 340, unit: "কেজি", change: -3.4, emoji: "🐟", category: "fish" },
  { id: 10, name: "ইলিশ মাছ (১ কেজি)", price: 1350, unit: "কেজি", change: 5.0, emoji: "🐟", category: "fish" },
  { id: 11, name: "ব্রয়লার মুরগি", price: 175, unit: "কেজি", change: -4.0, emoji: "🍗", category: "meat" },
  { id: 12, name: "গরুর মাংস", price: 750, unit: "কেজি", change: -1.2, emoji: "🥩", category: "meat" },
];

export const getProducts = async (): Promise<Product[]> => {
  return mockProducts;
};

export const getProductsByCategory = async (cat: string): Promise<Product[]> => {
  const filtered = mockProducts.filter((p) => p.category?.toLowerCase() === cat.toLowerCase());
  return filtered.length > 0 ? filtered : mockProducts;
};

export const getProductById = async (id: string): Promise<Product> => {
  const item = mockProducts.find((p) => String(p.id) === String(id));
  return item || mockProducts[0];
};

export const getCategories = async (): Promise<string[]> => {
  return ["chal", "dal", "oil", "vegetables", "fish", "meat"];
};