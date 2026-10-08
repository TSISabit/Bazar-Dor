"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signUp.email({ name, email, password });
      if (res.error) {
        toast.error(res.error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      } else {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("একটি সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">নতুন অ্যাকাউন্ট খুলুন</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">পূর্ণ নাম</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="input input-bordered w-full text-sm rounded-xl focus:border-emerald-600"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">ইমেইল</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="input input-bordered w-full text-sm rounded-xl focus:border-emerald-600"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input input-bordered w-full text-sm rounded-xl focus:border-emerald-600"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full border-none rounded-xl mt-2"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>
        <p className="text-xs text-center text-gray-500 mt-6">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-emerald-700 font-semibold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}