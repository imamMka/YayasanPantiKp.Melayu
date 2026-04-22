interface NewsContentProps {
  slug: string;
}

export default function NewsContent({ slug }: NewsContentProps) {
  return (
    <article className="p-8 md:p-12 text-[20px] md:text-[24px] text-[#6e6e6e] leading-relaxed space-y-6">
      <p>
        Tidak ada yang menyangka anak pendiam yang datang tiga tahun lalu itu
        kini berdiri di depan 200 peserta dari seluruh kecamatan, membawa pulang
        medali emas olimpiade matematika tingkat kota.
      </p>

      {/* Blockquote khas di foto */}
      <blockquote className="border-l-4 border-[#4A6B55] pl-6 py-2 my-10 italic">
        <p className=" text-[#4A6B55] italic mb-2">
          "Saya belajar bukan karena ingin menang, tapi karena di sini ada Kak
          Fadhil yang selalu percaya saya bisa."
        </p>
        <cite className=" text-[#4A6B55] italic">— Dito Rahman, 14 Thn</cite>
      </blockquote>

      <p>
        Dito masuk ke Yayasan Rumah Harapan pada usia 11 tahun setelah
        kehilangan kedua orang tuanya dalam sebuah kecelakaan. Dua tahun pertama
        ia hampir tidak berbicara dengan siapa pun. Namun perlahan, dengan
        pendampingan yang sabar dari para pengasuh...
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-10">
        {["#Prestasi", "#Inspiratif", "#Pendidikan"].map((tag) => (
          <span
            key={tag}
            className="px-6 py-2 bg-gray-50 border border-gray-100 rounded-full text-[#6E6E6E] hover:bg-gray-100 "
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
