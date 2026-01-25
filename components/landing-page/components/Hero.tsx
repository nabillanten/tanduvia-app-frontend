import {BookOpen} from "lucide-react";
import React from "react";

export const Hero: React.FC = () => {
  return (
    <section
      id="beranda"
      className="relative pt-12 pb-24 lg:pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-[#0366a9] text-sm font-semibold">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
              </span>
              Layanan Posyandu Digital
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
              Wujudkan Generasi <br />
              <span className="bg-linear-to-r from-[#02538b] to-blue-600 bg-clip-text text-transparent">
                Sehat & Cerdas
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              Sistem pemantauan kesehatan dan gizi anak berbasis standar WHO
              untuk mencegah stunting dan malnutrisi
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:scale-105 transition-transform">
                Lihat Perkembangan Anak
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 hover:scale-105 transition-all flex items-center justify-center gap-2">
                <BookOpen />
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#f0f7ff] to-blue-50 rounded-full blur-3xl opacity-50"></div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1000"
                alt="Ibu dan Bayi Sehat"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        src={`https://picsum.photos/100/100?random=${i + 10}`}
                        className="w-10 h-10 rounded-full border-2 border-white"
                        alt="pengguna"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      100+ Ibu Bergabung
                    </p>
                    <p className="text-xs text-slate-500">
                      Menggunakan Layanan Kami
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
