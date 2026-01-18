import SearchInput from "@/components/ui/SearchInput";
import TableLoading from "@/components/ui/table/table-loading";
import {Suspense} from "react";
import IbuTable from "./IbuTable";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";

type SearchParams = Promise<{page?: string; perPage?: string; q?: string}>;

const IbuPage = async (props: {searchParams: SearchParams}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const perPage = Number(searchParams.perPage) || 10;
  const query = searchParams.q ?? "";
  const ibuTableProps = {
    page,
    perPage,
    query,
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <SearchInput placeholder="Cari Berdasarkan NIK atau Nama" />
        <Link href={"/ibu/create"}>
          <Button>
            <PlusIcon /> <span>Baru</span>
          </Button>
        </Link>
      </div>
      <Suspense key={page} fallback={<TableLoading tableColumn={8} />}>
        <IbuTable {...ibuTableProps} />
      </Suspense>
    </div>
  );
};

export default IbuPage;
