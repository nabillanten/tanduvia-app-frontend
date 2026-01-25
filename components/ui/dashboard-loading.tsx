import React from "react";
import {Skeleton} from "../ui/skeleton";
import {ChartNoAxesCombined} from "lucide-react";

type Props = object;

const TableLoading = () => {
  return (
    <div className="flex flex-col gap-5 overflow-hidden rounded-lg">
      <div>
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="space-y-3">
        {new Array(5).fill(1).map((_, index) => {
          return (
            <div key={index} className="flex justify-between gap-5">
              {new Array(5).fill(1).map((_, index) => (
                <Skeleton key={index} className={`h-8 w-1/6`} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DashboardLoading = (props: Props) => {
  return (
    <div className="space-y-10 bg-white p-6">
      <section className="flex flex-col md:flex-row gap-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </section>
      <section>
        <Skeleton className="h-60 w-full flex flex-col gap-2 text-muted-foreground items-center justify-center">
          <ChartNoAxesCombined />
          Memuat Grafik
        </Skeleton>
      </section>
      <section>
        <TableLoading />
      </section>
    </div>
  );
};

export default DashboardLoading;
