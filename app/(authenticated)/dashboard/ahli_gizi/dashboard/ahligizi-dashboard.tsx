import React, {Suspense} from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {BookAlert, BookCheck, BookX} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import PanduanGiziTable from "./PanduanGiziTable";
import TableLoading from "@/components/ui/table/table-loading";
import fetchWithCredentials from "@/lib/fetchWithCredential";

type Props = object;
// 1. Tipe pendukung untuk keamanan data
type PanduanStatus = "published" | "pending" | "rejected";
type JenisIndeksGizi = "BB_U" | "TB_U" | "BB_TB";

// 2. Interface detail untuk isi objek panduan
export interface PanduanGiziItem {
  id: string;
  judul: string;
  jenis_indeks: JenisIndeksGizi;
  target_status: string;
  usia_min: number;
  usia_max: number;
  created_at: string; // ISO Date String
  status: PanduanStatus;
}

// 3. Interface untuk statistik di card
interface TotalPanduanGiziStats {
  totalPendingPanduan: number;
  totalPublishedPanduan: number;
  totalRejectedPanduan: number;
}

// 4. Interface utama di dalam properti "data"
interface PanduanGiziData {
  cardStats: {
    totalPanduanGizi: TotalPanduanGiziStats;
  };
  recentPanduanGizi: PanduanGiziItem[];
}

// 5. Interface pembungkus respons API (Root Object)
export interface PanduanGiziResponse {
  data: PanduanGiziData;
  statusCode: number;
  message: string;
}
const getDashboardData = async (): Promise<PanduanGiziResponse> => {
  const response = await fetchWithCredentials("/dashboard");
  return response;
};
const AhligiziDashboard = async (props: Props) => {
  const {
    data: {
      cardStats: {
        totalPanduanGizi: {
          totalPendingPanduan,
          totalPublishedPanduan,
          totalRejectedPanduan,
        },
      },
      recentPanduanGizi,
    },
  } = await getDashboardData();

  return (
    <section className="space-y-6">
      <section className="flex flex-col sm:flex-row w-full gap-4 ">
        <Card className="w-full ">
          <CardHeader>
            <CardDescription className="flex items-center gap-1 text-green-700">
              <BookCheck size={16} /> Panduan
            </CardDescription>
            <CardTitle className="text-green-700">
              {totalPublishedPanduan}
            </CardTitle>
            <CardAction>
              <Badge className="bg-green-100 text-green-900">
                <p>Terbit</p>
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="w-full ">
          <CardHeader>
            <CardDescription className="flex items-center gap-1 text-yellow-600">
              <BookAlert size={16} /> Panduan
            </CardDescription>
            <CardTitle className="text-yellow-600">
              {totalPendingPanduan}
            </CardTitle>
            <CardAction>
              <Badge className="bg-yellow-100 text-yellow-800">
                <p>Pending</p>
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="w-full ">
          <CardHeader>
            <CardDescription className="flex items-center gap-1 text-red-800">
              <BookX size={16} /> Panduan
            </CardDescription>
            <CardTitle className=" text-red-800">
              {totalRejectedPanduan}
            </CardTitle>
            <CardAction>
              <Badge className="bg-red-100 text-red-800">
                <p>Ditolak</p>
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
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
          <PanduanGiziTable recentPanduanGizi={recentPanduanGizi}/>
        </Suspense>
      </section>
    </section>
  );
};

export default AhligiziDashboard;
