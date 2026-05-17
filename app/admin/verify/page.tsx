"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Loader2,
  ChevronLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function ForgotVerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [targetEmail, setTargetEmail] = useState("");

  useEffect(() => {
    const email = sessionStorage.getItem("reset_password_email");
    if (!email) {
      // If no email, go back to the first step
      router.push("/admin/forgot-password");
    } else {
      setTargetEmail(email);
    }
  }, [router]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join("");
    const actualCode = sessionStorage.getItem("reset_password_code");

    if (enteredCode.length < 4) {
      setError("Masukkan 4 digit kode.");
      return;
    }

    if (enteredCode !== actualCode) {
      setError("Kode verifikasi salah. Silakan periksa kembali email Anda.");
      return;
    }

    setLoading(true);
    // Mark as verified
    sessionStorage.setItem("reset_password_verified", "true");
    router.push("/admin/reset-password");
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 p-8 md:p-10 border border-slate-100 text-center space-y-8 relative overflow-hidden">
        <button
          onClick={() => router.push("/admin/forgot-password")}
          className="absolute top-8 left-8 p-2 text-slate-400 hover:text-slate-600 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="inline-flex p-4 bg-emerald-50 rounded-3xl text-emerald-600 mt-6">
          <ShieldCheck className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900">Verifikasi Kode</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Masukkan 4 digit kode yang dikirim ke <br />
            <span className="font-bold text-slate-900 underline">{targetEmail}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-8">
          <div className="flex justify-center gap-3">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`code-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-14 h-16 text-center text-2xl text-emerald-600 font-black bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
              />
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || code.join("").length < 4}
            className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Verifikasi Kode
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
