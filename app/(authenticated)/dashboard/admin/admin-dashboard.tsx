import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Suspense} from "react";
import PemeriksaanTable from "./PemeriksaanTable";
import {ChartPieDonutText} from "@/components/pie-chart-donut";
import {ChartBarMultiple} from "@/components/bar-chart-multiple";
import {ChartPieDonutTextPanduanGizi} from "@/components/pie-chart-donut-panduan-gizi";
import TableLoading from "@/components/ui/table/table-loading";
import fetchWithCredentials from "@/lib/fetchWithCredential";

// 1. Definisikan interface kecil untuk bagian yang berulang
export interface MonthlyStat {
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

export interface StatusStat {
  year: number;
  monthly: MonthlyStat[];
  yearTotal: YearTotal;
}

// 2. Interface untuk data pemeriksaan terbaru
export interface RecentPemeriksaan {
  id: string;
  tanggal_pemeriksaan: string; // ISO Date string
  anak: {
    nama: string;
    jenis_kelamin: "L" | "P";
  };
  berat_badan: string;
  tinggi_badan: string;
  usia_bulan: number;
  status_bb_u: string; // Bisa dibuat enum jika statusnya sudah tetap
  status_tb_u: string;
}

export interface RecentPanduanGizi {
  totalPendingPanduan: number;
  totalPublishedPanduan: number;
  totalRejectedPanduan: number;
  total: number;
}

// 3. Interface utama untuk objek "data"
interface TanduviaDashboardData {
  cardStats: {
    totalAnak: number;
    totalPosyandu: number;
    totalPanduanGizi: number;
  };
  statusTBU: StatusStat;
  statusBBU: StatusStat;
  totalGender: {
    totalGenderL: number;
    totalGenderP: number;
    total: number;
  };
  recentPemeriksaan: RecentPemeriksaan[];
  totalPanduanGizi: RecentPanduanGizi;
}

// 4. Interface pembungkus untuk API Response
export interface DashboardResponse {
  data: TanduviaDashboardData;
  statusCode: number;
  message: string;
}

type Props = object;

const getDashboardData = async (): Promise<DashboardResponse> => {
  const response = await fetchWithCredentials("/dashboard");
  return response;
};

const AdminDashboard = async (props: Props) => {
  const {
    data: {
      cardStats,
      statusBBU,
      statusTBU,
      totalGender,
      totalPanduanGizi,
      recentPemeriksaan,
    },
  } = await getDashboardData();
  return (
    <section className="flex flex-col gap-6">
      <section className="flex flex-col md:flex-row w-full gap-4 ">
        <Card className="w-full bg-linear-to-t from-primary/10 to-background">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              Total Anak
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {cardStats?.totalAnak}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm">
            <p>Terpantau</p>
          </CardFooter>
        </Card>
        <Card className="w-full bg-linear-to-t from-primary/10 to-background">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              Total Posyandu
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {cardStats?.totalPosyandu}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm">
            <p>Terdaftar</p>
          </CardFooter>
        </Card>
        <Card className="w-full bg-linear-to-t from-primary/10 to-background">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              Total Panduan Gizi
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {cardStats?.totalPanduanGizi}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm">
            <p>Telah Terbit</p>
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
          <ChartPieDonutTextPanduanGizi pieChartData={totalPanduanGizi} />
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

export default AdminDashboard;
