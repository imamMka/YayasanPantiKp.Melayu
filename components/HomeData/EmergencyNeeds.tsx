import React from "react";

interface NeedItem {
  id: number;
  label: string;
  isUrgent: boolean;
}

const needs: NeedItem[] = [
  { id: 1, label: "Kebutuhan mendesak", isUrgent: true },
  { id: 2, label: "Biaya sekolah anak", isUrgent: false },
  { id: 3, label: "Perbaikan atap gedung", isUrgent: false },
  { id: 4, label: "Biaya kesehatan", isUrgent: false },
];

const EmergencyNeeds: React.FC = () => {
  return (
    <section className="w-full border-y border-[#E8E2D6] bg-white">
      <div className="container mx-auto">
        {/* Container dengan overflow-x-auto agar bisa di-scroll di HP */}
        <div className="flex no-scrollbar items-center divide-x divide-[#E8E2D6]">
          {needs.map((item) => (
            <div
              key={item.id}
              className="flex-none flex items-center gap-2 px-6 py-4 hover:bg-white/50 transition-colors cursor-pointer group"
            >
              {/* Dot Indicator */}
              <div className="relative flex h-3 w-3">
                {item.isUrgent && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${item.isUrgent ? "bg-red-600" : "bg-orange-400"}`}
                ></span>
              </div>

              {/* Text Label */}
              <span
                className={`text-[20px] md:text-[24px] font-medium whitespace-nowrap ${item.isUrgent ? "text-red-700" : "text-gray-600"}`}
              >
                {item.label}
              </span>

              {/* Arrow Icon kecil seperti di foto */}
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${item.isUrgent ? "text-red-400" : "text-gray-300"}`}
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmergencyNeeds;
