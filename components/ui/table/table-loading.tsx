import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

type Props = {
  tableColumn?: number;
  firstColumnSpan?: boolean;
};

const TableLoading = (props: Props) => {
  const {tableColumn = 5, firstColumnSpan = false} = props;
  return (
    <div className="flex flex-col gap-5 overflow-hidden rounded-lg py-5">
      <div className="px-4">
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="space-y-3">
        {new Array(7).fill(1).map((_, index) => {
          return (
            <div key={index} className="flex justify-between gap-5 px-4">
              {new Array(tableColumn).fill(1).map((_, index) => (
                <Skeleton
                  key={index}
                  className={`h-14 ${
                    index === 0 && firstColumnSpan ? "w-2/3" : "w-1/6"
                  }`}
                />
              ))}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-end px-4">
        <Skeleton className="h-14 w-1/6" />
      </div>
    </div>
  );
};

export default TableLoading;
