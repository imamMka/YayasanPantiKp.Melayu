"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Key, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from "lucide-react";
import { resetPassword } from "@/lib/actions";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isVerified = sessionStorage.getItem("reset_password_verified");
    if (isVerified !== "true") {
      router.push("/admin/forgot-password");
    }
  }, [router]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password minimal harus 6 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(newPassword);
      
      sessionStorage.removeItem("reset_password_code");
      sessionStorage.removeItem("reset_password_email");
      sessionStorage.removeItem("reset_password_verified");

      alert("Password berhasil diperbarui! Silakan login kembali.");
      router.push("/admin");
    } catch (err) {
      setError("Gagal memperbarui password. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 p-8 md:p-10 border border-slate-100 relative overflow-hidden">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-emerald-50 rounded-3xl text-emerald-600 mb-6">
            <Key className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Password Baru</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Buat password baru yang kuat untuk akun admin Anda.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Password Baru
            </label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Konfirmasi Password
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Perbarui Password
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
