import SearchInput from "@/components/ui/SearchInput";
import TableLoading from "@/components/ui/table/table-loading";
import React from "react";
import PemeriksaanTable from "./PemeriksaanTable";

type SearchParams = Promise<{page?: string; perPage?: string; q?: string}>;

const PemeriksaanPage = async (props: {searchParams: SearchParams}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const perPage = Number(searchParams.perPage) || 10;
  const query = searchParams.q ?? "";
  const PemreiksaanTableProps = {
    page,
    perPage,
    query,
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <h1 className="text-lg font-bold shrink-0">Daftar Pemeriksaan</h1>
        {/* <SearchInput placeholder="Cari Berdasarkan NIK atau Nama" /> */}
      </div>
      <React.Suspense key={page} fallback={<TableLoading tableColumn={10} />}>
        <PemeriksaanTable {...PemreiksaanTableProps} />
      </React.Suspense>
    </div>
  );
};

export default PemeriksaanPage;
