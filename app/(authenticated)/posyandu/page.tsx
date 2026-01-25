import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import Link from "next/link";
import React from "react";

import TableLoading from "@/components/ui/table/table-loading";
import PosyanduTable from "./PosyanduTable";

const PosyanduPage = async () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold shrink-0">Daftar Posyandu</h1>
        <Link href={"/posyandu/create"}>
          <Button>
            <PlusIcon /> <span>Baru</span>
          </Button>
        </Link>
      </div>
      <React.Suspense
        key={1}
        fallback={<TableLoading tableColumn={3} firstColumnSpan />}>
        <PosyanduTable />
      </React.Suspense>
    </div>
  );
};

export default PosyanduPage;
