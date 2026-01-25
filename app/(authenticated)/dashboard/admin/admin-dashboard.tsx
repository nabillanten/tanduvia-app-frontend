import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {BabyIcon, House, Salad} from "lucide-react";
import React from "react";
import PemeriksaanTable from "./PemeriksaanTable";
import {ChartAreaInteractive} from "./dashboard-chart";

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
      <section>
        <ChartAreaInteractive />
      </section>
      <section>
        <PemeriksaanTable />
      </section>
    </section>
  );
};

export default AdminDashboard;
