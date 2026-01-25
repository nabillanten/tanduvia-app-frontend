"use client";

import Image from "next/image";
import React, {useState} from "react";
import logo from "@/public/images/logo.png";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <figure className="w-10 rounded-xl flex items-center justify-center">
              <Image src={logo} alt="Tanduvia Logo" />
            </figure>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a
              href="#beranda"
              className="hover:text-[#02538b] transition-colors">
              Beranda
            </a>
            <a
              href="#layanan"
              className="hover:text-[#02538b] transition-colors">
              Layanan
            </a>
            <a
              href="#cara-kerja"
              className="hover:text-[#02538b] transition-colors">
              Cara Kerja
            </a>
            <a
              href="#mengapa-kami"
              className="hover:text-[#02538b] transition-colors">
              Mengapa Kami
            </a>
          </div>

          <div className="hidden md:block">
            <Link href={"/auth/signin"}>
              <button className="bg-[#0366a9] text-white px-5 py-2.5 rounded-full hover:bg-[#02538b] transition-all shadow-sm font-medium text-sm">
                Masuk
              </button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 py-4 px-4 space-y-2">
          <a
            href="#beranda"
            className="block px-4 py-2 text-slate-600 hover:bg-[#f0f7ff]"
            onClick={() => setIsOpen(false)}>
            Beranda
          </a>
          <a
            href="#layanan"
            className="block px-4 py-2 text-slate-600 hover:bg-[#f0f7ff]"
            onClick={() => setIsOpen(false)}>
            Layanan
          </a>
          <a
            href="#cara-kerja"
            className="block px-4 py-2 text-slate-600 hover:bg-[#f0f7ff]"
            onClick={() => setIsOpen(false)}>
            Cara Kerja
          </a>
          <a
            href="#mengapa-kami"
            className="block px-4 py-2 text-slate-600 hover:bg-[#f0f7ff]"
            onClick={() => setIsOpen(false)}>
            Mengapa Kami
          </a>
          <Link href={"/auth/signin"}>
            <button className="w-full bg-[#0366a9] text-white px-4 py-2.5 rounded-xl font-medium">
              Masuk
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};
