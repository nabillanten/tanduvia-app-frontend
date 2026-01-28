import {Button} from "@/components/ui/button";
import TableLoading from "@/components/ui/table/table-loading";
import {PlusIcon} from "lucide-react";
import Link from "next/link";
import React from "react";
import PemeriksaanByAnakTable from "./PemeriksaanByAnakTable";

type SearchParams = Promise<{page?: string; perPage?: string; q?: string}>;

const PemeriksaanByAnakPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{anakId: string}>;
  searchParams: SearchParams;
}) => {
  const {anakId} = await params;

  const searchParam = await searchParams;

  const page = Number(searchParam.page) || 1;
  const perPage = Number(searchParam.perPage) || 10;
  const query = searchParam.q ?? "";
  const pemeriksaanByAnakTableProps = {
    page,
    perPage,
    query,
    anakId,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* <div className="flex gap-6 justify-end">
        <Link href={"/pemeriksaan/create"}>
          <Button>
            <PlusIcon /> <span>Tambah Pemeriksaan</span>
          </Button>
        </Link>
      </div> */}
      <React.Suspense
        key={page + query}
        fallback={<TableLoading tableColumn={8} />}>
        <PemeriksaanByAnakTable {...pemeriksaanByAnakTableProps} />
      </React.Suspense>
    </div>
  );
};

export default PemeriksaanByAnakPage;
