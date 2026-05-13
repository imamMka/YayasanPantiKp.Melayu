"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Key, 
  Mail, 
  ShieldCheck, 
  Save, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { getSettings, updateSettings } from "@/lib/actions";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    adminUsername: "",
    adminSecret: "",
    recoveryEmail: ""
  });

  useEffect(() => {
    async function load() {
      const data = await getSettings();
      setSettings({
        adminUsername: data.adminUsername,
        adminSecret: data.adminSecret,
        recoveryEmail: data.recoveryEmail || ""
      });
      setLoading(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan Keamanan</h1>
        <p className="text-slate-500 text-sm">Kelola kredensial admin dan opsi pemulihan akun.</p>
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
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900"
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
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Email Pemulihan Google</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={settings.recoveryEmail}
                  onChange={(e) => setSettings(prev => ({ ...prev, recoveryEmail: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900"
                  placeholder="anda@gmail.com"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2 ml-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                Email ini akan digunakan sebagai satu-satunya cadangan resmi untuk reset akses.
              </p>
            </div>
          </div>

          <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 disabled:opacity-70"
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
