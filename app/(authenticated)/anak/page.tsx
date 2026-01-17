import SearchInput from "@/components/ui/SearchInput";
import TableLoading from "@/components/ui/table/table-loading";
import React, {Suspense} from "react";
import AnakTable from "./AnakTable";

type SearchParams = Promise<{page?: string; perPage?: string; q?: string}>;

const AnakPage = async (props: {searchParams: SearchParams}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const perPage = Number(searchParams.perPage) || 10;
  const query = searchParams.q ?? "";
  const usersTableProps = {
    page,
    perPage,
    query,
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <SearchInput placeholder="Cari Berdasarkan Nama..." />
      </div>
      <Suspense key={123} fallback={<TableLoading tableColumn={8} />}>
        <AnakTable {...usersTableProps} />
      </Suspense>
    </div>
  );
};

export default AnakPage;
