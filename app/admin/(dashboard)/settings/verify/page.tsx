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
import { getSettings, updateSettings } from "@/lib/actions";

export default function EmailVerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [targetEmail, setTargetEmail] = useState("");

  useEffect(() => {
    const email = sessionStorage.getItem("pending_recovery_email");
    if (!email) {
      router.push("/admin/settings");
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

    // Auto focus next input
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
    const actualCode = sessionStorage.getItem("email_verification_code");

    if (enteredCode.length < 4) {
      setError("Masukkan 4 digit kode.");
      return;
    }

    if (enteredCode !== actualCode) {
      setError("Kode verifikasi salah. Silakan periksa kembali email Anda.");
      return;
    }

    setLoading(true);
    try {
      // Get current settings
      const currentSettings = await getSettings();

      // Update with new email
      await updateSettings({
        adminUsername: currentSettings.adminUsername,
        adminSecret: currentSettings.adminSecret,
        recoveryEmail: targetEmail
      });

      // Clear session
      sessionStorage.removeItem("email_verification_code");
      sessionStorage.removeItem("pending_recovery_email");

      alert("Email berhasil diverifikasi dan disimpan!");
      router.push("/admin/settings");
      router.refresh();
    } catch (err) {
      setError("Gagal menyimpan perubahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 space-y-8">
      <button
        onClick={() => router.push("/admin/settings")}
        className="flex items-center text-slate-400 hover:text-slate-600 font-bold transition-all"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        BATALKAN VERIFIKASI
      </button>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-emerald-900/5 text-center space-y-8">
        <div className="inline-flex p-4 bg-emerald-50 rounded-3xl text-emerald-600">
          <ShieldCheck className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900">Verifikasi Email</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Kami telah mengirimkan 4 digit kode ke <br />
            <span className="font-bold text-emerald-600 underline">{targetEmail}</span>
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
                className="w-14 h-16 text-center text-2xl font-black bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
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
                Verifikasi & Simpan
              </>
            )}
          </button>
        </form>

        <p className="text-[11px] text-slate-400 font-medium">
          Tidak menerima email? Periksa folder spam atau pastikan <br /> pengetikan email sudah benar.
        </p>
      </div>
    </div>
  );
}
