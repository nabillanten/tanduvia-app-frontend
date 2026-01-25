import React from "react";
import {Skeleton} from "../ui/skeleton";
import {Card} from "./card";

type Props = object;

const FormLoading = (props: Props) => {
  return (
    <Card>
      <div className="space-y-10 bg-white p-6">
        <div className="space-y-5">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-10" />
        </div>
        <div className="space-y-5">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-10" />
        </div>
        <div className="space-y-5">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-10" />
        </div>
        <div className="space-y-5">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-10" />
        </div>
        <div className="space-y-5 flex gap-6 justify-end">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </Card>
  );
};

export default FormLoading;
