import React from "react";
import { Mail, Phone, MapPin, Navigation } from "lucide-react";

const Contact: React.FC = () => {
  // Ganti alamat ini dengan alamat asli di Google Maps untuk mendapatkan koordinat yang tepat
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.176472421303!2d106.8197775!3d-6.3712071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec0691761d45%3A0x33480838183017a4!2sStasiun%20Depok%20Baru!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid";

  const googleMapsLink = "https://maps.app.goo.gl/PantiAsuhanKpMelayu"; // Ganti dengan link asli

  return (
    <section id="contact-profile" className="container mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Info Kontak */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4 text-center lg:text-left">
            <p className="text-[#4A6B55] font-black uppercase tracking-[0.25em] text-[14px] md:text-[16px]">
              Hubungi Kami
            </p>
            <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-black text-[#2D2D2D] leading-[1.1]">
              Lokasi & <br className="hidden md:block" /> Akses Panti
            </h2>
            <p className="text-slate-500 text-[18px] md:text-[20px] font-medium max-w-md mx-auto lg:mx-0">
              Kami menyambut hangat kedatangan Anda untuk melihat langsung perkembangan anak-anak asuh kami.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <ContactItem
              icon={<Mail className="w-6 h-6" />}
              label="Email Resmi"
              value="yayasanpantiasuhankpmelayu@gmail.com"
              href="mailto:yayasanpantiasuhankpmelayu@gmail.com"
              color="bg-blue-50 text-blue-600"
            />
            <ContactItem
              icon={<Phone className="w-6 h-6" />}
              label="Layanan WhatsApp"
              value="+62 812-1911-8993"
              href="https://wa.me/6281219118993"
              color="bg-emerald-50 text-emerald-600"
            />
            <ContactItem
              icon={<MapPin className="w-6 h-6" />}
              label="Titik Lokasi"
              value="Jl. Melati No. 24, Beji, Kota Depok, Jawa Barat 16421"
              href={googleMapsLink}
              color="bg-orange-50 text-orange-600"
            />
          </div>
        </div>

        {/* Peta & Petunjuk */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          {/* Container Map yang Responsif */}
          <div className="w-full h-[350px] sm:h-[450px] lg:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white relative group">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Panti Asuhan"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
            <a 
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold shadow-xl flex items-center gap-2 hover:bg-slate-900 hover:text-white transition-all active:scale-95"
            >
              <Navigation className="w-5 h-5" />
              Petunjuk Arah
            </a>
          </div>

          {/* Petunjuk Arah */}
          <div className="w-full p-8 md:p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-8">
            <div className="p-5 bg-emerald-50 rounded-3xl text-emerald-600 shrink-0">
              <Navigation className="w-10 h-10" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-[20px] md:text-[24px] font-black text-slate-900">Akses Paling Mudah</h4>
              <ul className="space-y-1 text-slate-500 text-[16px] md:text-[18px] font-medium">
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  ± 5 menit jalan kaki dari Stasiun Depok Baru
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Akses mobil via Margonda Raya atau Jl. Beji
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  color: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  label,
  value,
  href,
  color,
}) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group"
  >
    <div className={`p-4 rounded-2xl shrink-0 transition-transform group-hover:scale-110 ${color}`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="font-bold text-[16px] sm:text-[18px] md:text-[20px] text-slate-900 truncate">
        {value}
      </p>
    </div>
  </a>
);

export default Contact;
