"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Key,
  Mail,
  ShieldCheck,
  Save,
  Loader2,
  AlertCircle,
  Send,
  CheckCircle2
} from "lucide-react";
import { getSettings, updateSettings } from "@/lib/actions";
import emailjs from "@emailjs/browser";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [originalEmail, setOriginalEmail] = useState("");
  const [settings, setSettings] = useState({
    adminUsername: "",
    adminSecret: "",
    recoveryEmail: ""
  });

  useEffect(() => {
    async function load() {
      const data = await getSettings();
      const email = data.recoveryEmail || "";
      setSettings({
        adminUsername: data.adminUsername,
        adminSecret: data.adminSecret,
        recoveryEmail: email
      });
      setOriginalEmail(email);
      setLoading(false);
    }
    load();
  }, []);

  const handleSendVerification = async () => {
    if (!settings.recoveryEmail || !settings.recoveryEmail.includes("@")) {
      alert("Masukkan email yang valid.");
      return;
    }

    setSendingEmail(true);
    try {
      // Generate 4 digit code
      const code = Math.floor(1000 + Math.random() * 9000).toString();

      // Store code in sessionStorage for verification (simple approach)
      sessionStorage.setItem("email_verification_code", code);
      sessionStorage.setItem("pending_recovery_email", settings.recoveryEmail);

      // Send via EmailJS
      // Replace these with actual IDs provided in instructions
      const serviceId = "yayasanverificationinfo";
      const templateId = "yayasanverificationinfo";
      const publicKey = "oXzx9P_8CwypMckE4";

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: settings.recoveryEmail,
          verification_code: code,
          to_name: settings.adminUsername
        },
        publicKey
      );

      alert("Kode verifikasi telah dikirim ke email Anda!");
      router.push("/admin/settings/verify");
    } catch (error) {
      console.error(error);
      alert("Gagal mengirim email. Pastikan konfigurasi EmailJS sudah benar.");
    } finally {
      setSendingEmail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If email is changed, force verification
    if (settings.recoveryEmail !== originalEmail) {
      alert("Email pemulihan berubah. Silakan lakukan verifikasi email terlebih dahulu.");
      return;
    }

    setSaving(true);
    try {
      await updateSettings(settings);
      alert("Pengaturan berhasil disimpan!");
    } catch {
      alert("Gagal menyimpan pengaturan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const isEmailChanged = settings.recoveryEmail !== originalEmail;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pengaturan Keamanan</h1>
          <p className="text-slate-500 text-sm">Kelola kredensial admin dan opsi pemulihan akun.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mt-1" />
              <div>
                <h4 className="font-bold text-emerald-900">Lindungi Akun Anda</h4>
                <p className="text-emerald-700/80 text-sm leading-relaxed">
                  Pastikan kredensial admin disimpan dengan aman. Gunakan kombinasi password yang kuat.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Username Admin</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={settings.adminUsername}
                    onChange={(e) => setSettings(prev => ({ ...prev, adminUsername: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 font-medium"
                    placeholder="admin"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Password Admin</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={settings.adminSecret}
                    onChange={(e) => setSettings(prev => ({ ...prev, adminSecret: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-400 uppercase ml-1">Email Pemulihan Google</label>
                {originalEmail && !isEmailChanged && (
                  <span className="flex items-center text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Terverifikasi
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={settings.recoveryEmail}
                    onChange={(e) => setSettings(prev => ({ ...prev, recoveryEmail: e.target.value }))}
                    className={`w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 font-medium ${isEmailChanged ? "border-amber-300 bg-amber-50/20" : ""}`}
                    placeholder="anda@gmail.com"
                  />
                </div>

                {isEmailChanged && (
                  <button
                    type="button"
                    onClick={handleSendVerification}
                    disabled={sendingEmail}
                    className="flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-all shadow-lg shadow-amber-900/10 disabled:opacity-70 whitespace-nowrap"
                  >
                    {sendingEmail ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Verifikasi Email
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3 border border-slate-100">
                <AlertCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {isEmailChanged
                    ? "Email telah berubah. Anda harus melakukan verifikasi kode 4-digit sebelum dapat menyimpan perubahan ini."
                    : "Email ini adalah satu-satunya cadangan untuk reset akses jika Anda lupa password. Pastikan email aktif."
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving || isEmailChanged}
              className="flex items-center px-8 py-3 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/10 disabled:opacity-50 disabled:grayscale"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
