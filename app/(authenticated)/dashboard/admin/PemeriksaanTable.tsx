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
import {ArrowUpRightIcon} from "lucide-react";
import {RecentPemeriksaan} from "./admin-dashboard";

const PemeriksaanTable = async ({
  recentPemeriksaan,
}: {
  recentPemeriksaan: RecentPemeriksaan[];
}) => {
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Pemeriksaan Terkini</CardTitle>
          <CardDescription>Tabel Daftar Pemeriksan Terkini</CardDescription>
          <CardAction>
            <Link href={"/pemeriksaan"}>
              <Button variant={"link"}>
                Lihat Selengkapnya <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <DashboardTable columns={columns} data={recentPemeriksaan ?? []} />
        </CardContent>
      </Card>
    </>
  );
};

export default PemeriksaanTable;
