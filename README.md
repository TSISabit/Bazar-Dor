# 🛒 Bazar Dor (বাজার দর) - Daily Commodity Market Price Tracker

A modern web application built to monitor, analyze, and compare real-time daily commodity and kitchen market prices across major local bazaars.

---

## 🚀 Key Features

- **Real-Time Price Ticker:** Animated infinite marquee displaying trending items, current prices, and percentage changes.
- **Market Monitoring Dashboard:**
  - **Today's Risers (আজ দাম বেড়েছে):** Highlights the top commodities experiencing the highest price surges.
  - **Today's Fallers (আজ দাম কমেছে):** Displays commodities with notable price drops.
  - **All Products:** Comprehensive inventory listing with interactive sorting (Default, Price: Low to High, Price: High to Low).
- **Category Browsing:** Categorized listings for essentials including Rice (চাল), Lentils (ডাল), Oil (তেল), Vegetables (সবজি), Fish (মাছ), and Meat (মাংস) with loading skeletons.
- **Protected Product Details:** In-depth product view featuring pricing across different physical bazaars (e.g., Karwan Bazar, Mirpur-1, Mohammadpur Town Hall). Accessible only to authenticated users (unauthenticated users are automatically redirected to Sign-In).
- **Authentication:** Integrated email/password and OAuth authentication using BetterAuth.
- **Hydration Safe:** Standardized date formatting with synchronized external stores to eliminate SSR/CSR hydration mismatches.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & DaisyUI
- **Authentication:** BetterAuth
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
