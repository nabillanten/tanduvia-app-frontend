import SearchInput from "@/components/ui/SearchInput";
import TableLoading from "@/components/ui/table/table-loading";
import React, {Suspense} from "react";
import StatusFilter from "@/components/ui/StatusFilter";
import PanduanGiziTable from "../rekomendasi_gizi/PanduanGiziTable";

type SearchParams = Promise<{
  page?: string;
  perPage?: string;
  q?: string;
  status?: string;
}>;

const PanduanGiziPage = async (props: {searchParams: SearchParams}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const perPage = Number(searchParams.perPage) || 10;
  const query = searchParams.q ?? "";
  const status = searchParams.status ?? "";

  const panduanGiziTableProps = {
    page,
    perPage,
    query,
    status,
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <h1 className="text-lg font-bold shrink-0">Daftar Panduan Gizi</h1>
        <SearchInput placeholder="Cari Berdasarkan Judul..." />
        {/* Filter Status */}
        <StatusFilter />
      </div>
      <Suspense key={page + query} fallback={<TableLoading tableColumn={8} />}>
        <PanduanGiziTable {...panduanGiziTableProps} />
      </Suspense>
    </div>
  );
};

export default PanduanGiziPage;
