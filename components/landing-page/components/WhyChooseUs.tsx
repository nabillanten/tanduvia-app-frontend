import React from 'react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      title: "Standar Internasional",
      description: "Menggunakan kurva pertumbuhan WHO yang telah tervalidasi secara global untuk keakuratan diagnosis gizi.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Deteksi Dini",
      description: "Identifikasi risiko stunting sejak dini memungkinkan intervensi yang tepat waktu bagi tumbuh kembang anak.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Mudah Digunakan",
      description: "Interface yang intuitif dan responsif, dirancang khusus untuk kenyamanan penggunaan desktop maupun mobile.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Panduan Lengkap",
      description: "Rekomendasi nutrisi dan konten edukasi harian yang komprehensif untuk mencegah berbagai jenis malnutrisi.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  return (
    <section id="mengapa-kami" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
             <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#f0f7ff] rounded-full blur-3xl opacity-50"></div>
             <img 
               src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
               alt="Petugas Posyandu menggunakan Tanduvia" 
               className="rounded-[3rem] shadow-2xl relative z-10"
             />
             <div className="absolute -bottom-6 -right-6 bg-[#0366a9] text-white p-8 rounded-[2rem] shadow-xl z-20 hidden sm:block max-w-[240px]">
                <p className="text-3xl font-bold mb-1">100%</p>
                <p className="text-sm opacity-90">Akurasi Perhitungan Sesuai Standar WHO</p>
             </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-[#02538b] font-bold tracking-wider uppercase text-sm mb-3 text-left">Mengapa Memilih Tanduvia</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Membantu Memantau Kesehatan Anak secara Akurat dan Efisien</h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">Tanduvia dirancang untuk memudahkan petugas posyandu dan orang tua dalam memberikan perhatian terbaik bagi generasi masa depan.</p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#f0f7ff] text-[#0366a9] flex items-center justify-center shrink-0">
                    {reason.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{reason.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};