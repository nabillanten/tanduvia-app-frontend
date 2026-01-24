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

type Props = object;

const DashboardPage = (props: Props) => {
  return (
    <section className="space-y-6">
      <section className="flex flex-col md:flex-row w-full gap-4 ">
        <Card className="w-full ">
          <CardHeader>
            <CardDescription className="flex items-center gap-2 text-green-700">
              <BookCheck size={20} /> Panduan Gizi
            </CardDescription>
            <CardTitle className="text-green-700">5</CardTitle>
            <CardAction>
              <Badge className="bg-green-100 text-green-900">
                <p>Terbit</p>
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="w-full ">
          <CardHeader>
            <CardDescription className="flex items-center gap-2 text-yellow-600">
              <BookAlert size={20} /> Panduan Gizi
            </CardDescription>
            <CardTitle className="text-yellow-600">6</CardTitle>
            <CardAction>
              <Badge className="bg-yellow-100 text-yellow-800">
                <p>Pending</p>
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="w-full ">
          <CardHeader>
            <CardDescription className="flex items-center gap-2 text-red-800">
              <BookX size={20} /> Panduan Gizi
            </CardDescription>
            <CardTitle className=" text-red-800">1</CardTitle>
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
          <PanduanGiziTable />
        </Suspense>
      </section>
    </section>
  );
};

export default DashboardPage;
