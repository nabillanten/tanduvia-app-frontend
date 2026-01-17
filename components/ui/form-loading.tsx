import React from "react";
import {Skeleton} from "../ui/skeleton";

type Props = object;

const FormLoading = (props: Props) => {
  return (
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
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
};

export default FormLoading;
