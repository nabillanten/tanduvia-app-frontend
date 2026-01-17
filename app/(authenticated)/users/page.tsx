import {Button} from "@/components/ui/button";
import SearchInput from "@/components/ui/SearchInput";
import {PlusIcon} from "lucide-react";
import Link from "next/link";
import React, {Suspense} from "react";
import UsersTable from "./UsersTable";
import TableLoading from "@/components/ui/table/table-loading";

type SearchParams = Promise<{page?: string; perPage?: string; q?: string}>;

const UserPage = async (props: {searchParams: SearchParams}) => {
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
        <Link href={"/users/create"}>
          <Button>
            <PlusIcon /> <span>Baru</span>
          </Button>
        </Link>
      </div>
      <Suspense key={123} fallback={<TableLoading tableColumn={7}/>}>
        <UsersTable {...usersTableProps} />
      </Suspense>
    </div>
  );
};

export default UserPage;
