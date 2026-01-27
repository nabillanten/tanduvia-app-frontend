import {columns} from "./columns";
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
import {PanduanGiziItem} from "./ahligizi-dashboard";

const PanduanGiziTable = async ({
  recentPanduanGizi,
}: {
  recentPanduanGizi: PanduanGiziItem[];
}) => {
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
          <DashboardTable
            columns={columns}
            // @ts-expect-error type
            data={recentPanduanGizi ?? []}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default PanduanGiziTable;
