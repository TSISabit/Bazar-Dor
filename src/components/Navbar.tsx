"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getBanglaDate } from "@/lib/utils";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

const categories = [
  { name: "সব পণ্য", slug: "/" },
  { name: "চাল", slug: "/category/chal" },
  { name: "ডাল", slug: "/category/dal" },
  { name: "তেল", slug: "/category/oil" },
  { name: "সবজি", slug: "/category/vegetables" },
  { name: "মাছ", slug: "/category/fish" },
  { name: "মাংস", slug: "/category/meat" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
    toast.success("সফলভাবে লগআউট হয়েছে!");
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Navbar Row */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo + Bengali Date */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 relative flex-shrink-0">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <div className="text-xl font-bold text-emerald-800 tracking-tight flex items-center gap-1">
              বাজার দর
            </div>
            <p className="text-[11px] text-gray-500">{getBanglaDate()}</p>
          </div>
        </Link>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="btn btn-sm btn-ghost text-emerald-800 font-medium"
              >
                {session.user.name || "প্রোফাইল"}
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline btn-error"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="btn btn-sm btn-outline border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-700"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Middle/Second Row: Category Navigation Links */}
      <nav className="border-t bg-gray-50/80 overflow-x-auto scrollbar-none">
        <div className="max-w-6xl mx-auto px-4 flex gap-6 text-sm py-2">
          {categories.map((cat) => {
            const isActive = pathname === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={cat.slug}
                className={`whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? "text-emerald-700 font-bold border-b-2 border-emerald-700 pb-1"
                    : "text-gray-600 hover:text-emerald-700"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}