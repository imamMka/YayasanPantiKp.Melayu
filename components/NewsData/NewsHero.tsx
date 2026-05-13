export default function NewsHero() {
  return (
    <section className="container mx-auto px-6 pt-12 md:pt-24 pb-12">
      <div className="max-w-4xl">
        <p className="text-emerald-600 font-black tracking-[0.3em] text-[14px] sm:text-[18px] md:text-[20px] uppercase mb-4">
          Berita & Kegiatan
        </p>
        <h1 className="text-[36px] sm:text-[52px] md:text-[72px] font-black text-slate-900 leading-[1.1] mb-8">
          Update Terbaru <br className="hidden sm:block" /> Dari Panti Asuhan
        </h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed text-[18px] sm:text-[20px] md:text-[24px] font-medium">
          Cerita nyata, laporan transparansi, dan momen inspiratif dari kehidupan
          sehari-hari anak-anak asuh kami.
        </p>
      </div>
    </section>
  );
}
