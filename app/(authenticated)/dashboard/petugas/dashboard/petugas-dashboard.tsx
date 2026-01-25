import React, {Suspense} from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {BookAlert, BookCheck, BookX} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import TableLoading from "@/components/ui/table/table-loading";
import {ChartAreaInteractive} from "../../admin/dashboard-chart";
import PemeriksaanTable from "../../admin/PemeriksaanTable";

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
      <section>
        <ChartAreaInteractive />
      </section>
      <section>
        <PemeriksaanTable />
      </section>
      {/* <section>
        <Suspense
          key={1}
          fallback={
            <Card>
              <CardContent>
                <TableLoading tableColumn={8} />
              </CardContent>
            </Card>
          }>
          <PanduanGiziTable />
        </Suspense>
      </section> */}
    </section>
  );
};

export default PetugasDashboard;
