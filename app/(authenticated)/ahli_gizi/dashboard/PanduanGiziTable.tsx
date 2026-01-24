import {columns} from "./columns";
import fetchWithCredentials from "@/lib/fetchWithCredential";
import {DashboardTable} from "@/components/ui/table/dashboard-table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ChevronRight} from "lucide-react";

async function findAllPanduanGizi() {
  const response = await fetchWithCredentials(`/rekomendasi-gizi?pageSize=10`);
  return response?.data;
}

const PanduanGiziTable = async () => {
  const panduanGizi = await findAllPanduanGizi();
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Panduan Gizi</CardTitle>
          <CardDescription>Tabel Daftar Panduan Gizi</CardDescription>
          <CardAction>
            <Link href={"/rekomendasi_gizi"}>
              <Button variant={"link"}>
                Lihat Selengkapnya <ChevronRight />
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <DashboardTable columns={columns} data={panduanGizi?.data ?? []} />
        </CardContent>
      </Card>
    </>
  );
};

export default PanduanGiziTable;
