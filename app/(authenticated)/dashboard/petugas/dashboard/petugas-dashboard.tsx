import React, {Suspense} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PemeriksaanTable from "../../admin/PemeriksaanTable";
import {ChartBarMultiple} from "@/components/bar-chart-multiple";
import {ChartPieDonutText} from "@/components/pie-chart-donut";
import {ChartPieDonutTextPanduanGizi} from "@/components/pie-chart-donut-panduan-gizi";
import TableLoading from "@/components/ui/table/table-loading";
import fetchWithCredentials from "@/lib/fetchWithCredential";

type Props = object;

// 1. Tipe Pendukung untuk Statistik Bulanan (Grafik)
interface MonthlyStat {
  month: number;
  monthName: string;
  normal: number;
  notNormal: number;
  total: number;
}

interface YearTotal {
  normal: number;
  notNormal: number;
  total: number;
}

interface YearlyStatus {
  year: number;
  monthly: MonthlyStat[];
  yearTotal: YearTotal;
}

// 2. Tipe untuk Pemeriksaan Terbaru (Table Recent)
interface RecentPemeriksaan {
  id: string;
  tanggal_pemeriksaan: string;
  anak: {
    nama: string;
    jenis_kelamin: "L" | "P";
  };
  berat_badan: string;
  tinggi_badan: string;
  usia_bulan: number;
  status_bb_u: string;
  status_tb_u: string;
}

// 3. Interface Utama di dalam properti "data"
interface DashboardData {
  cardStats: {
    totalAnak: number;
    totalStatusNormal: number;
    totalStatusNotNormal: number;
  };
  statusTBU: YearlyStatus;
  statusBBU: YearlyStatus;
  totalGender: {
    totalGenderL: number;
    totalGenderP: number;
    total: number;
  };
  recentPemeriksaan: RecentPemeriksaan[];
  recentotalPanduanGizi: {
    totalPendingPanduan: number;
    totalPublishedPanduan: number;
    totalRejectedPanduan: number;
    total: number;
  };
}

// 4. Interface Pembungkus Respons API
export interface DashboardMainResponse {
  data: DashboardData;
  statusCode: number;
  message: string;
}

const getDashboardData = async (): Promise<DashboardMainResponse> => {
  const response = await fetchWithCredentials("/dashboard");
  return response;
};

const PetugasDashboard = async (props: Props) => {
  const {
    data: {
      cardStats: {totalAnak, totalStatusNormal, totalStatusNotNormal},
      statusBBU,
      statusTBU,
      totalGender,
      recentotalPanduanGizi,
      recentPemeriksaan,
    },
  } = await getDashboardData();

  return (
    <section className="space-y-6">
      <section className="flex flex-col md:flex-row w-full gap-4 ">
        <Card className="w-full bg-linear-to-t from-primary/10 to-background">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              Total Anak
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalAnak}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm">
            <p className="text-xs">Terdaftar</p>
          </CardFooter>
        </Card>
        <Card className="w-full bg-linear-to-t from-green-800/10 to-background">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              Status Normal
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalStatusNormal}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm">
            <p className="text-xs">Total</p>
          </CardFooter>
        </Card>
        <Card className="w-full bg-linear-to-t from-yellow-800/10 to-background">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              Perlu perhatian
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalStatusNotNormal}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm">
            <p className="text-xs">Butuh Intervensi</p>
          </CardFooter>
        </Card>
      </section>

      <section className="grid lg:grid-cols-2 gap-4">
        <div>
          <ChartBarMultiple
            chartData={statusBBU?.monthly}
            title="Jumlah Anak Berdasarkan Status BB/U"
          />
        </div>
        <div>
          <ChartBarMultiple
            chartData={statusTBU?.monthly}
            title="Jumlah Anak Berdasarkan Status TB/U"
          />
        </div>
      </section>
      <section className="grid lg:grid-cols-2 gap-4">
        <div>
          <ChartPieDonutText pieChartData={totalGender} />
        </div>
        <div>
          <ChartPieDonutTextPanduanGizi pieChartData={recentotalPanduanGizi} />
        </div>
      </section>
      <section>
        <Suspense
          key={1}
          fallback={
            <Card>
              <CardContent>
                <TableLoading tableColumn={8} />
              </CardContent>
            </Card>
          }>
          <PemeriksaanTable recentPemeriksaan={recentPemeriksaan} />
        </Suspense>
      </section>
    </section>
  );
};

export default PetugasDashboard;
