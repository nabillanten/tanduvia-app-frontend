"use client";
import {useMemo} from "react";
import {Baby, Scale, Ruler, Calendar, Activity} from "lucide-react";

import {calculateStatusTBU, calculateStatusBBU} from "@/lib/calculator";
import {
  TB_BOYS,
  TB_GIRLS,
  FULL_BB_BOYS,
  FULL_BB_GIRLS,
  Gender,
} from "@/data/growthData";
import InfoCard from "@/components/general/InfoCard";
import GrowthChart from "@/components/general/GrowChart";
import {Card, CardContent} from "@/components/ui/card";

// --- INTERFACES ---
interface Pemeriksaan {
  berat_badan: string;
  tinggi_badan: string;
  tanggal_pemeriksaan: string;
  usia_bulan: number;
  status_bb_u: string;
  status_tb_u: string;
}

interface ChildData {
  nama: string;
  jenis_kelamin: Gender;
  pemeriksaan: Pemeriksaan[];
}

// --- SUB-COMPONENT: UNTUK MENAMPILKAN 1 ANAK ---
const ChildGrowthCard = ({child}: {child: ChildData}) => {
  // 1. Ambil pemeriksaan terakhir
  const latestMeasurement = useMemo(() => {
    if (!child.pemeriksaan || child.pemeriksaan.length === 0) return null;
    return child.pemeriksaan[child.pemeriksaan.length - 1];
  }, [child]);

  // 2. Hitung Status TBU
  const statusTBU = useMemo(() => {
    if (!latestMeasurement) return "-";
    return calculateStatusTBU(
      Number(latestMeasurement.usia_bulan),
      Number(latestMeasurement.tinggi_badan),
      child.jenis_kelamin,
    );
  }, [latestMeasurement, child.jenis_kelamin]);

  // 3. Hitung Status BBU
  const statusBBU = useMemo(() => {
    if (!latestMeasurement) return "-";
    return calculateStatusBBU(
      Number(latestMeasurement.usia_bulan),
      Number(latestMeasurement.berat_badan),
      child.jenis_kelamin,
    );
  }, [latestMeasurement, child.jenis_kelamin]);

  // 4. Siapkan Data Chart TB
  const mergedTBData = useMemo(() => {
    const standardData = child.jenis_kelamin === "L" ? TB_BOYS : TB_GIRLS;
    return standardData.map((point) => {
      const childMeasure = child.pemeriksaan.find(
        (m) => Math.round(m.usia_bulan) === point.age,
      );
      return {
        ...point,
        childHeight: childMeasure ? childMeasure.tinggi_badan : null,
      };
    });
  }, [child]);

  // 5. Siapkan Data Chart BB
  const mergedBBData = useMemo(() => {
    const standardData =
      child.jenis_kelamin === "L" ? FULL_BB_BOYS : FULL_BB_GIRLS;
    return standardData.map((point) => {
      const childMeasure = child.pemeriksaan.find(
        (m) => Math.round(m.usia_bulan) === point.age,
      );
      return {
        ...point,
        childWeight: childMeasure ? childMeasure.berat_badan : null,
      };
    });
  }, [child]);

  return (
    <Card className="mb-10 shadow-md border-t-4 border-t-blue-500">
      <CardContent className="pt-6">
        {/* HEADER PROFIL ANAK */}
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-6 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 p-4 opacity-5 pointer-events-none">
            <Baby size={80} />
          </div>
          <div className="relative z-10">
            <h2 className="text-sm md:text-base font-extrabold text-slate-900 leading-tight">
              {child.nama}
            </h2>
            <div className="flex gap-2 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 uppercase">
                {child.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
              </span>
            </div>
          </div>
        </div>

        {/* JIKA DATA KOSONG */}
        {!latestMeasurement ? (
          <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed">
            <p className="text-gray-500">
              Belum ada data pemeriksaan untuk anak ini.
            </p>
          </div>
        ) : (
          <>
            {/* GRID KARTU METRIK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
              <InfoCard
                label="Berat Badan"
                value={latestMeasurement.berat_badan}
                unit="kg"
                icon={<Scale className="text-blue-600" />}
                colorClass="bg-blue-50"
              />
              <InfoCard
                label="Tinggi Badan"
                value={latestMeasurement.tinggi_badan}
                unit="cm"
                icon={<Ruler className="text-indigo-600" />}
                colorClass="bg-indigo-50"
              />
              <InfoCard
                label="Usia"
                value={latestMeasurement.usia_bulan}
                unit="bulan"
                icon={<Activity className="text-rose-600" />}
                colorClass="bg-rose-50"
              />
              <InfoCard
                label="Tgl Pemeriksaan"
                value={new Date(
                  latestMeasurement.tanggal_pemeriksaan,
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                unit=""
                icon={<Calendar className="text-emerald-600" />}
                colorClass="bg-emerald-50"
              />
            </div>

            {/* RINGKASAN KESEHATAN */}
            <div className="border p-6 rounded-2xl relative mb-8 overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <h4 className="lg:text-lg font-bold mb-4 flex items-center relative z-10">
                <Activity className="mr-2 text-blue-400" /> Ringkasan Kesehatan
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-blue-600 text-xs uppercase tracking-wide font-bold">
                    Status Tinggi Badan
                  </p>
                  <p className="text-sm lg:text-base font-bold">{statusTBU}</p>
                </div>
                <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-emerald-600 text-xs uppercase tracking-wide font-bold">
                    Status Berat Badan
                  </p>
                  <p className="text-sm lg:text-base font-bold">{statusBBU}</p>
                </div>
              </div>
              <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-yellow-600 text-xs uppercase tracking-wide font-bold">
                  Catatan
                </p>
                <p className="text-sm lg:text-base">{statusBBU}</p>
              </div>
            </div>

            {/* GRAFIK PERTUMBUHAN */}

            <div className="space-y-8">
              <GrowthChart
                title={`Kurva TB/U - ${child.nama}`}
                data={mergedTBData}
                childDataKey="childHeight"
                yLabel="cm"
                unit=" cm"
              />

              <GrowthChart
                title={`Kurva BB/U - ${child.nama}`}
                data={mergedBBData}
                childDataKey="childWeight"
                yLabel="kg"
                unit=" kg"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// --- MAIN COMPONENT: LOOPING ARRAY CHILDREN ---
const PertumbuhanAnakList = ({childrenData}: {childrenData: ChildData[]}) => {
  if (!childrenData || childrenData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Tidak ada data anak yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-6 md:pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Laporan Pertumbuhan Anak
          </h1>
          <p className="text-slate-500 mt-2">
            Menampilkan data pertumbuhan untuk {childrenData.length} anak.
          </p>
        </div>

        {/* LOOPING SEMUA ANAK DI SINI */}
        <div className="space-y-12">
          {childrenData.map((child, index) => (
            <ChildGrowthCard key={`${child.nama}-${index}`} child={child} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PertumbuhanAnakList;
