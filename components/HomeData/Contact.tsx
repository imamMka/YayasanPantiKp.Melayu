import React from "react";

const Contact: React.FC = () => {
  // Ganti alamat ini dengan alamat asli di Google Maps untuk mendapatkan koordinat yang tepat
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.176472421303!2d106.8197775!3d-6.3712071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec0691761d45%3A0x33480838183017a4!2sStasiun%20Depok%20Baru!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid";

  return (
    <section className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <p className="text-[20px] md:text-[24px] text-[#4A6B55] font-bold uppercase tracking-widest mb-2">
          Kontak & Lokasi
        </p>
        <h2 className="text-[48px] md:text-[64px] font-semibold text-[#2D2D2D] mb-8 leading-tight">
          Hubungi kami langsung
        </h2>
        <div className="space-y-6 text-[#6E6E6E]">
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

      <div className="flex flex-col gap-6">
        {/* Container Map yang Responsif */}
        <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Panti Asuhan"
          ></iframe>
        </div>

        {/* Petunjuk Arah */}
        <div className="w-full p-6 bg-white border border-gray-100 rounded-2xl text-[#6E6E6E] text-[20px] md:text-[24px] space-y-3">
          <p className="text-[#2D2D2D]">
            <strong>Petunjuk Arah:</strong>
          </p>
          <ul className="space-y-2">
            <li>• ± 5 menit dari Stasiun Depok Baru (jalan kaki)</li>
            <li>• ± 10 menit dari Margonda Raya via Jl. Beji</li>
          </ul>
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
    <div className="p-4 bg-orange-50 rounded-xl text-2xl shrink-0">{icon}</div>
    <div>
      <p className="text-sm md:text-base text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="font-medium text-[20px] md:text-[24px] text-[#2D2D2D]">
        {value}
      </p>
    </div>
  </div>
);

export default Contact;
