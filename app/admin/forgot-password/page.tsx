"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Loader2, 
  ChevronLeft,
  Send,
  AlertCircle
} from "lucide-react";
import { checkRecoveryEmail } from "@/lib/actions";
import emailjs from "@emailjs/browser";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Masukkan email yang valid.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Check if email matches database
      const isValid = await checkRecoveryEmail(email);
      if (!isValid) {
        setError("Email tidak terdaftar sebagai email pemulihan.");
        setLoading(false);
        return;
      }

      // 2. Generate code
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      sessionStorage.setItem("reset_password_code", code);
      sessionStorage.setItem("reset_password_email", email);

      // 3. Send via EmailJS
      // Reuse the same Service/Template IDs from settings page
      const serviceId = "yayasanverificationinfo";
      const templateId = "yayasanverificationinfo";
      const publicKey = "oXzx9P_8CwypMckE4";

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: email,
          verification_code: code,
          to_name: "Admin"
        },
        publicKey
      );

      alert("Kode pemulihan telah dikirim ke email Anda!");
      router.push("/admin/verify");
    } catch (err) {
      console.error(err);
      setError("Gagal memproses permintaan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 p-8 md:p-10 border border-slate-100 relative overflow-hidden">
        <button
          onClick={() => router.push("/admin")}
          className="absolute top-8 left-8 p-2 text-slate-400 hover:text-slate-600 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="text-center mb-10 mt-6">
          <div className="inline-flex p-4 bg-amber-50 rounded-3xl text-amber-600 mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Pulihkan Password</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Masukkan email pemulihan Anda untuk menerima kode verifikasi 4-digit.
          </p>
        </div>

        <form onSubmit={handleRequestReset} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Email Pemulihan
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 transition-all font-medium"
                placeholder="anda@gmail.com"
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
                <Send className="w-5 h-5" />
                Kirim Kode Pemulihan
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
