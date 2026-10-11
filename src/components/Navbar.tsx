"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

const categories = [
  { name: "চাল", slug: "chal", emoji: "🍚" },
  { name: "ডাল", slug: "dal", emoji: "🫘" },
  { name: "তেল", slug: "oil", emoji: "🛢️" },
  { name: "সবজি", slug: "vegetables", emoji: "🥬" },
  { name: "মাছ", slug: "fish", emoji: "🐟" },
  { name: "মাংস", slug: "meat", emoji: "🍗" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      {/* Main Navbar */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-emerald-500 text-white shadow-sm">
            <img
              src="/logo-icon.png"
              alt="বাজার দর"
              className="h-6 w-6 object-contain"
            />
          </div>

          <div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              বাজার দর
            </span>
            <span className="mt-0.5 block text-[11px] font-medium text-gray-500">
              {date}
            </span>
          </div>
        </Link>

        {/* Authentication */}
        <div className="flex items-center gap-2 sm:gap-3">
          {session?.user ? (
            <>
              <Link
                href="/profile"
                className="max-w-28 truncate rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 sm:max-w-none sm:text-sm"
              >
                {session.user.name || "প্রোফাইল"}
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 sm:text-sm"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg border border-emerald-600 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:px-4 sm:text-sm"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 sm:px-4 sm:text-sm"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="border-t border-gray-100 bg-white">
        <div className="no-scrollbar mx-auto flex max-w-6xl items-center justify-start gap-5 overflow-x-auto px-4 py-3 sm:justify-center sm:gap-7">
          {categories.map((cat) => {
            // IMPORTANT: Match the existing plural route folder.
            const href = `/categories/${cat.slug}`;

            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={cat.slug}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 pb-1 text-xs font-semibold transition-colors sm:text-sm ${
                  isActive
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-gray-600 hover:text-emerald-600"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}