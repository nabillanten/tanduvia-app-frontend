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

type Props = object;

const PetugasDashboard = (props: Props) => {
  return (
    <section className="space-y-6">
      <section className="flex flex-col md:flex-row w-full gap-4 ">
        <Card className="w-full bg-linear-to-t from-primary/10 to-background">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              Total Anak
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              222
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
              212
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
              10
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start text-sm">
            <p className="text-xs">Butuh Intervensi</p>
          </CardFooter>
        </Card>
      </section>
      <section className="grid grid-cols-2 gap-4">
        <div>
          <ChartPieDonutText />
        </div>
        <div>
          <ChartPieDonutTextPanduanGizi />
        </div>
      </section>
      <section className="grid lg:grid-cols-2 gap-4">
        <div>
          <ChartBarMultiple title="Jumlah Anak Berdasarkan Status BB/U" />
        </div>
        <div>
          <ChartBarMultiple title="Jumlah Anak Berdasarkan Status TB/U" />
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

export default PetugasDashboard;
