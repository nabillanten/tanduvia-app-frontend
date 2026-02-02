import SearchInput from "@/components/ui/SearchInput";
import TableLoading from "@/components/ui/table/table-loading";
import {Suspense} from "react";
import PanduanGiziTable from "./PanduanGiziTable";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import StatusFilter from "@/components/ui/StatusFilter";

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
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-end">
          <h1 className="text-lg font-bold shrink-0">
            Daftar Rekomendasi Gizi
          </h1>
          <div className="flex gap-2">
            {/* Search Input */}
            <SearchInput placeholder="Cari Berdasarkan Judul" />
            {/* Filter Status */}
            <StatusFilter />
          </div>
        </div>
        <Link href={"/rekomendasi_gizi/create"}>
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" /> <span>Baru</span>
          </Button>
        </Link>
      </div>

      <Suspense
        key={page + query + status}
        fallback={<TableLoading tableColumn={8} />}>
        <PanduanGiziTable {...panduanGiziTableProps} />
      </Suspense>
    </div>
  );
};

export default PanduanGiziPage;
