import React from "react";

const Contact: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
          Kontak & Lokasi
        </p>
        <h2 className="text-3xl font-bold text-[#2D3E33] mb-8">
          Hubungi kami langsung
        </h2>
        <div className="space-y-6">
          <ContactItem
            icon="📧"
            label="Email"
            value="info@pantiaruhankp_melayu.org"
          />
          <ContactItem
            icon="📞"
            label="Handphone/WhatsApp"
            value="+621234567890"
          />
          <ContactItem
            icon="📍"
            label="Lokasi"
            value="Jl. Melati No. 24, Beji, Kota Depok, Jawa Barat 16421"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-200 aspect-video rounded-xl flex items-center justify-center text-gray-400">
          [Peta Google Maps]
        </div>
        <div className="p-4 bg-white border border-gray-100 rounded-xl text-xs space-y-2">
          <p>
            <strong>Petunjuk Arah:</strong>
          </p>
          <p>• ± 5 menit dari Stasiun Depok Baru (jalan kaki)</p>
          <p>• ± 10 menit dari Margonda Raya via Jl. Beji</p>
        </div>
      </div>
    </section>
  );
};

const ContactItem: React.FC<{ icon: string; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-orange-100 rounded-lg text-orange-600">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-sm">{value}</p>
    </div>
  </div>
);

export default Contact;
