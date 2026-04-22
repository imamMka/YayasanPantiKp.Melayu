import React from "react";

const Contact: React.FC = () => {
  return (
    <section className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <p className="text-[20px] md:text-[24px] text-[#4A6B55] font-bold uppercase tracking-widest mb-2">
          Kontak & Lokasi
        </p>
        <h2 className="text-[48px] md:text-[64px] font-semibold text-[#2D2D2D] mb-8">
          Hubungi kami langsung
        </h2>
        <div className="space-y-6 text-[20px] md:text-[24px] text-[#6E6E6E]">
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
      <div className="space-y-4 flex flex-col items-center justify-between">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.2794695620896!2d107.01301677355679!3d-6.383050462432128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699753f452a75d%3A0x25e019e428a06c70!2sSekolah%20Developer%20Indonesia!5e1!3m2!1sid!2ssg!4v1776828714454!5m2!1sid!2ssg"
          width="600"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="bg-gray-200 aspect-video rounded-xl flex items-center justify-center text-gray-400"
        ></iframe>
        <div className="w-[600px] p-4 bg-white border border-gray-100 rounded-xl text-[#6E6E6E] text-[20px] md:text-[24px] space-y-2">
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
