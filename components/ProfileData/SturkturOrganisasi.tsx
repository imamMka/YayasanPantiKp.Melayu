"use client";

import React from "react";

interface Staff {
  name: string;
  role: string;
  image: string; // Mengubah initials menjadi image
}

const staffList: Staff[] = [
  { name: "H. Yusuf Mansyur", role: "Ketua Yayasan", image: "/profil.jpg" },
  { name: "Budi Santoso", role: "Sekretaris", image: "/profil.jpg" },
  { name: "Endah Sulistyowati", role: "Bendahara", image: "/profil.jpg" },
  { name: "Siti Aminah", role: "Divisi Pendidikan", image: "/profil.jpg" },
  {
    name: "Abdul Hadi",
    role: "Divisi Logistik & Operasional",
    image: "/profil.jpg",
  },
  { name: "dr. Ahmad Subari", role: "Divisi Kesehatan", image: "/profil.jpg" },
];

const StrukturOrganisasi: React.FC = () => {
  return (
    <section id="struktur-organisasi" className="container mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-[20px] md:text-[24px] text-[#4A6B55] font-semibold uppercase tracking-[0.2em] mb-2">
          Struktur Pengurus
        </p>
        <h2 className="text-[48px] md:text-[64px] font-semibold text-[#2D2D2D]">
          Pengelola Yayasan
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffList.map((staff, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Foto Profil Pengurus */}
            <div className="flex-none w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#4A6B55]/10">
              <img
                src={staff.image}
                alt={staff.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback jika gambar gagal dimuat
                  (e.target as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=" + staff.name;
                }}
              />
            </div>

            {/* Informasi Pengurus */}
            <div className="flex flex-col">
              <h4 className="text-[20px] md:text-[24px] font-semibold text-[#2D3E33] leading-tight">
                {staff.name}
              </h4>
              <p className="text-[14px] md:text-[16px] text-gray-500 tracking-wide mt-1">
                {staff.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StrukturOrganisasi;
