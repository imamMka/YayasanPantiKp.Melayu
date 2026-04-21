import React from "react";

interface Staff {
  name: string;
  role: string;
  initials: string;
}

const staffList: Staff[] = [
  { name: "H. Yusuf Mansyur", role: "Ketua Yayasan", initials: "YM" },
  { name: "Budi Santoso", role: "Sekretaris", initials: "BS" },
  { name: "Endah Sulistyowati", role: "Bendahara", initials: "ES" },
  { name: "Siti Aminah", role: "Divisi Pendidikan", initials: "SA" },
  { name: "Abdul Hadi", role: "Divisi Logistik & Operasional", initials: "AH" },
  { name: "dr. Ahmad Subari", role: "Divisi Kesehatan", initials: "AS" },
];

const StrukturOrganisasi: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2 font-bold">
          Struktur Pengurus
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E33]">
          Pengelola Yayasan
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffList.map((staff, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Lingkaran Avatar dengan Inisial */}
            <div className="flex-none w-14 h-14 rounded-full bg-[#2D3E33] flex items-center justify-center text-white font-bold text-sm">
              {staff.initials}
            </div>

            {/* Informasi Pengurus */}
            <div className="flex flex-col">
              <h4 className="text-sm md:text-base font-bold text-[#2D3E33]">
                {staff.name}
              </h4>
              <p className="text-[11px] md:text-xs text-gray-500 font-medium tracking-wide">
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
