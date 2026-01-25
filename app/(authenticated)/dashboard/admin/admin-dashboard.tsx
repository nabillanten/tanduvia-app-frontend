import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {BabyIcon, House, Salad} from "lucide-react";
import React, {Suspense} from "react";
import PemeriksaanTable from "./PemeriksaanTable";
import {ChartAreaInteractive} from "./dashboard-chart";
import {ChartPieDonutText} from "@/components/pie-chart-donut";
import {ChartBarMultiple} from "@/components/bar-chart-multiple";
import {ChartPieDonutTextPanduanGizi} from "@/components/pie-chart-donut-panduan-gizi";
import TableLoading from "@/components/ui/table/table-loading";

type Props = object;

const AdminDashboard = (props: Props) => {
  return (
    <section className="flex flex-col gap-6">
      <section className="flex flex-col md:flex-row w-full gap-4 ">
        <Card className="w-full bg-linear-to-t from-primary/10 to-background">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <BabyIcon size={20} /> Total Anak
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              222
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm">
            <p className="">Terdaftar</p>
          </CardFooter>
        </Card>
        <Card className="w-full bg-linear-to-t from-primary/10 to-background">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <House size={20} /> Total Posyandu
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              5
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm">
            <p className="">Terdaftar</p>
          </CardFooter>
        </Card>
        <Card className="w-full bg-linear-to-t from-primary/10 to-background">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <Salad size={20} /> Total Panduan Gizi
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              222
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm">
            <p className="">Telah Terbit</p>
          </CardFooter>
        </Card>
      </section>
      <section className="grid lg:grid-cols-2 gap-4">
        {/* <ChartAreaInteractive /> */}
        <div>
          <ChartBarMultiple title="Jumlah Anak Berdasarkan Status BB/U" />
        </div>
        <div>
          <ChartBarMultiple title="Jumlah Anak Berdasarkan Status TB/U" />
        </div>
      </section>
      <section className="grid grid-cols-2 gap-4">
        <div>
          <ChartPieDonutText />
        </div>
        <div>
          <ChartPieDonutTextPanduanGizi />
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
          <PemeriksaanTable />
        </Suspense>
      </section>
    </section>
  );
};

export default AdminDashboard;
