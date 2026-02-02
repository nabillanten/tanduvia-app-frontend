import {Navbar} from "@/components/landing-page/components/Navbar";
import {Hero} from "@/components/landing-page/components/Hero";
import {Services} from "@/components/landing-page/components/Services";
import {Footer} from "@/components/landing-page/components/Footer";
import {HowItWorks} from "@/components/landing-page/components/HowItWorks";
import {WhyChooseUs} from "@/components/landing-page/components/WhyChooseUs";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {BookOpen} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />

        {/* Statistics/Trust Section */}
        <div className="bg-white border-y border-slate-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-extrabold text-primary">200+</p>
                <p className="text-slate-500 text-sm mt-1">Balita Terdaftar</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-primary">98%</p>
                <p className="text-slate-500 text-sm mt-1">Kepuasan Ibu</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-primary">5</p>
                <p className="text-slate-500 text-sm mt-1">
                  Posyandu Terdaftar
                </p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-primary">WHO</p>
                <p className="text-slate-500 text-sm mt-1">
                  Standar Pertumbuhan Internasional
                </p>
              </div>
            </div>
          </div>
        </div>

        <Services />
        <HowItWorks />
        <WhyChooseUs />

        {/* Call to Action Section */}
        <section
          id="edukasi"
          className="py-24 relative overflow-hidden bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-[3rem] p-8 sm:p-12 lg:p-20 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/50 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/50 rounded-full blur-3xl"></div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight">
                  Mulai Pantau Kesehatan Anak Sekarang
                </h2>
                <p className="md:text-lg mb-10 opacity-90">
                  Bergabunglah dengan ribuan orang tua dan petugas kesehatan
                  yang telah mempercayai Tanduvia untuk memantau pertumbuhan
                  anak
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={"/pertumbuhan_anak"}>
                    <Button
                      variant={"secondary"}
                      className="w-full font-bold p-6 hover:scale-105 transition-transform">
                      Lihat Perkembangan Anak
                    </Button>
                  </Link>
                  <a href="#mengapa-kami">
                    <Button className="w-full font-bold p-6 border hover:scale-105 transition-transform">
                      <BookOpen /> Pelajari Lebih Lanjut
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
