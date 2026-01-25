import React from "react";

interface IServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}
const services: IServiceCard[] = [
  {
    title: "Kurva Pertumbuhan WHO",
    description:
      "Grafik pertumbuhan dengan standar WHO untuk berat badan dan tinggi badan, lengkap dengan zona interpretasi warna.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-[#02538b]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        />
      </svg>
    ),
  },
  {
    title: "Deteksi Dini Stunting",
    description:
      "Sistem peringatan otomatis untuk anak yang berisiko stunting atau malnutrisi berdasarkan pengukuran akurat.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-rose-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  },
  {
    title: "Panduan Nutrisi",
    description:
      "Rekomendasi makanan bergizi dan panduan pencegahan stunting sesuai dengan usia dan kebutuhan spesifik anak.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-amber-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
  },
  {
    title: "Riwayat Pertumbuhan",
    description:
      "Tracking perkembangan anak dari waktu ke waktu untuk melihat tren pertumbuhan secara visual dan informatif.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-emerald-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Dashboard Kesehatan",
    description:
      "Dashboard interaktif dengan statistik lengkap dan visualisasi data kesehatan semua anak dalam satu tampilan.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-[#0366a9]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
  },
  {
    title: "Manajemen Data Posyandu",
    description:
      "Input dan kelola data pemeriksaan bulanan dengan mudah, lengkap dengan validasi otomatis yang cerdas.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

const ServiceCard: React.FC<{service: IServiceCard}> = ({service}) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
      {service.icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">
      {service.description}
    </p>
  </div>
);

export const Services: React.FC = () => {
  return (
    <section id="layanan" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#02538b] font-bold tracking-wider uppercase text-sm mb-3">
            Layanan Kami
          </h2>
          <p className="text-4xl font-extrabold text-slate-900 mb-6">
            Solusi Digital Terpadu untuk Posyandu
          </p>
          <p className="text-lg text-slate-600">
            Tanduvia hadir dengan fitur-fitur canggih untuk membantu pemantauan
            kesehatan anak yang lebih presisi dan efisien.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
