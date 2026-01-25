import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Input Data Pemeriksaan",
      description: "Masukkan data hasil pemeriksaan posyandu: nama, usia, berat, tinggi, dan tanggal pemeriksaan ke dalam sistem.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Analisis Otomatis",
      description: "Sistem menghitung status gizi berdasarkan standar WHO dan menampilkan hasil pada kurva pertumbuhan secara instan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Dapatkan Rekomendasi",
      description: "Terima panduan nutrisi dan peringatan otomatis jika anak memerlukan perhatian khusus atau intervensi medis.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section id="cara-kerja" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[#02538b] font-bold tracking-wider uppercase text-sm mb-3">Cara Kerja</h2>
          <p className="text-4xl font-extrabold text-slate-900 mb-6">Proses Pemantauan yang Sederhana</p>
          <p className="text-lg text-slate-600">Hanya dengan 3 langkah mudah, Bunda dan petugas dapat memastikan kesehatan si kecil terpantau dengan standar terbaik.</p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#0366a9] text-white flex items-center justify-center shadow-xl mb-8 border-4 border-white">
                  {step.icon}
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 w-full">
                  <span className="text-[#bae0fd] font-black text-5xl block mb-4">{step.number}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};