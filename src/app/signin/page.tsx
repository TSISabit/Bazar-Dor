"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password"); 
      return;
    }

    try {
      setLoading(true);
      const res = await signIn.email({
        email,
        password,
      });

      if (res?.error) {
        toast.error(res.error.message || "Incorrect email or password!"); 
      } else {
        toast.success("Login Successful!"); 
        setTimeout(() => {
          router.push(callbackUrl);
          router.refresh();
        }, 800);
      }
    } catch {
      toast.error("Server issue! Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      toast.loading(`${provider} দিয়ে লগিন হচ্ছে...`, { duration: 1500 });
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      toast.error(`${provider} Error signing with this`);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-10 px-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Sign In
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে একাউন্টে লগইন করুন
        </p>
      </div>

      <div className="w-full max-w-md bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 text-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors mt-2 shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Sign in হচ্ছে" : "Sign In"} 
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative bg-white px-3 text-[11px] text-gray-500 font-medium">
            OTHBA
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span className="text-center">গুগল দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span className="text-center">গিটহাব দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <div className="text-center text-xs text-gray-600">
          একাউন্ট নেই?{" "}
          <Link href="/signup" className="font-bold text-emerald-700 hover:underline">
            Sign Up করুন
          </Link>
        </div>
      </div>

      <Link
        href="/"
        className="mt-6 text-xs text-gray-500 hover:text-gray-800 hover:underline transition-colors"
      >
        ← হোম পেইজে ফিরে যান 
      </Link>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center text-sm text-gray-400">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}