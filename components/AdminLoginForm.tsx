"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, User, Lock, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data?.message || "Kombinasi username atau password salah.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Terjadi masalah koneksi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl shadow-emerald-900/5 p-8 border border-slate-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex p-4 bg-emerald-600 rounded-3xl mb-6 shadow-lg shadow-emerald-200">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Panel Admin
          </h1>
          <p className="text-slate-500 font-medium">
            Yayasan Panti Asuhan Kp Melayu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 transition-all font-medium"
                placeholder="Masukkan username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 transition-all font-medium"
                placeholder="Masukkan password"
                required
              />
            </div>
          </div>

          {error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 flex items-center animate-shake">
              <span className="mr-2">⚠️</span> {error}
            </div>
          ) : null}



          <button
            type="submit"
            disabled={loading}
            className="group w-full rounded-2xl bg-emerald-600 px-4 py-4 text-white font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Masuk ke Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 flex justify-center relative z-20">
          <Link
            href="/admin/forgot-password"
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl transition-all shadow-sm border border-emerald-100"
          >
            Lupa Password?
          </Link>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 relative z-10">
          <Link
            href="/"
            className="text-slate-400 hover:text-emerald-600 font-bold text-sm transition-colors flex items-center gap-2"
          >
            ← Kembali ke Beranda
          </Link>
          <div className="text-[10px] text-center text-slate-300 font-bold uppercase tracking-[0.2em]">
            Akses Terbatas • © 2026 Yayasan Panti Asuhan
          </div>
        </div>
      </div>
    </main>
  );
}
