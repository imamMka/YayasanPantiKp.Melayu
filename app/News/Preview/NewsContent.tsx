export default function NewsContent() {
  return (
    <article className="p-8 md:p-12 pt-0 text-gray-600 leading-relaxed space-y-6">
      <p>
        Tidak ada yang menyangka anak pendiam yang datang tiga tahun lalu itu
        kini berdiri di depan 200 peserta dari seluruh kecamatan, membawa pulang
        medali emas olimpiade matematika tingkat kota.
      </p>

      {/* Blockquote khas di foto */}
      <blockquote className="border-l-4 border-[#D1E7D6] pl-6 py-2 my-10 italic">
        <p className="text-xl text-[#2D3E33] font-medium mb-2">
          "Saya belajar bukan karena ingin menang, tapi karena di sini ada Kak
          Fadhil yang selalu percaya saya bisa."
        </p>
        <cite className="text-xs text-gray-400 not-italic">
          — Dito Rahman, 14 Thn
        </cite>
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
            className="px-6 py-2 bg-gray-50 border border-gray-100 rounded-full text-[11px] font-medium text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
