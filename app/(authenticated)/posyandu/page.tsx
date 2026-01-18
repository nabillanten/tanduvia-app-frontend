import {Button} from "@/components/ui/button";
import SearchInput from "@/components/ui/SearchInput";
import {PlusIcon} from "lucide-react";
import Link from "next/link";
import React, {Suspense} from "react";

import TableLoading from "@/components/ui/table/table-loading";
import PosyanduTable from "./PosyanduTable";

type SearchParams = Promise<{page?: string; perPage?: string; q?: string}>;

const PosyanduPage = async (props: {searchParams: SearchParams}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const perPage = Number(searchParams.perPage) || 10;
  const query = searchParams.q ?? "";
  const posyanduTableProps = {
    page,
    perPage,
    query,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end gap-6">
        <Link href={"/posyandu/create"}>
          <Button>
            <PlusIcon /> <span>Baru</span>
          </Button>
        </Link>
      </div>
      <Suspense
        key={page}
        fallback={<TableLoading tableColumn={3} firstColumnSpan />}>
        <PosyanduTable {...posyanduTableProps} />
      </Suspense>
    </div>
  );
};

export default PosyanduPage;
