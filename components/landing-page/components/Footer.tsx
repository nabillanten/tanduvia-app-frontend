import {Mail, Phone} from "lucide-react";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#0366a9] rounded-xl flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Tanduvia</span>
            </div>
            <p className="text-sm leading-relaxed">
              Platform modern untuk membantu pemantauan kesehatan ibu dan anak
              yang akurat sesuai standar WHO. Mencegah stunting dengan teknologi
              cerdas.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Navigasi</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="#beranda"
                  className="hover:text-[#38a1f7] transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#layanan"
                  className="hover:text-[#38a1f7] transition-colors">
                  Fitur Layanan
                </a>
              </li>
              <li>
                <a
                  href="#cara-kerja"
                  className="hover:text-[#38a1f7] transition-colors">
                  Cara Kerja
                </a>
              </li>
              <li>
                <a
                  href="#mengapa-kami"
                  className="hover:text-[#38a1f7] transition-colors">
                  Mengapa Tanduvia
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="text-[#0366a9]" />
                halo@tanduvia.id
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#0366a9]" />
                +62 812 1457 8839
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Update Terbaru</h4>
            <p className="text-sm mb-4">
              Dapatkan tips pencegahan stunting mingguan.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Anda"
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-[#0366a9] outline-none text-white placeholder:text-slate-500"
              />
              <button className="bg-[#02538b] text-white px-4 py-2 rounded-lg text-sm font-bold">
                Gabung
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs">
          <p>
            © 2024 Tanduvia Digital Health. Dipersembahkan untuk Masa Depan
            Indonesia yang Lebih Sehat.
          </p>
        </div>
      </div>
    </footer>
  );
};
