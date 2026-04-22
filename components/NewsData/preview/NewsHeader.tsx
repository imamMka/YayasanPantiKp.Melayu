interface NewsHeaderProps {
  slug: string;
}

export default function NewsHeader({ slug }: NewsHeaderProps) {
  return (
    <section>
      {/* Image Banner */}
      <div className="aspect-video w-full bg-gray-200 relative">
        {/* Replace with <Image /> */}
        <div className="w-full h-full bg-slate-300" />
      </div>

      <div className="p-8 md:p-12 pb-0">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-[14px] font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full tracking-wider">
            Pendidikan
          </span>
          <span className="text-[14px] text-gray-400 font-medium">
            28-Agustus-2026 | Admin
          </span>
        </div>

        <nav className="text-[14px] text-gray-400 mb-4 flex gap-2">
          <span>Berita</span> <span>›</span>{" "}
          <span className="text-gray-600">Pendidikan</span>
        </nav>

        <h1 className="text-[24px] md:text-[32px] font-bold text-[#2D3E33] leading-tight mb-8">
          Dito, dari panti asuhan ke podium olimpiade — sebuah perjalanan yang
          mengubah segalanya
        </h1>
      </div>
    </section>
  );
}
