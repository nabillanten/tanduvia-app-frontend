import SearchInput from "@/components/ui/SearchInput";
import TableLoading from "@/components/ui/table/table-loading";
import React, {Suspense} from "react";
import AnakTable from "./AnakTable";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {AlertCircle, ArrowUpRightIcon, PlusIcon} from "lucide-react";

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
      <div className="flex gap-4">
        <h1 className="text-lg font-bold shrink-0">Daftar Anak</h1>
        <SearchInput placeholder="Cari Berdasarkan NIK atau Nama" />
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <PlusIcon /> <span>Baru</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <PopoverHeader>
              <PopoverTitle className="flex gap-2 items-center">
                <AlertCircle className="text-primary" size={16} /> Tambah Anak
              </PopoverTitle>
              <PopoverDescription>
                Untuk menambah anak, silakan pilih tambah anak pada
                salah satu ibu di
                <Link
                  href={"/ibu"}
                  className="text-primary underline transition-colors hover:text-primary/50 flex">
                  {" "}
                  halaman Ibu <ArrowUpRightIcon size={12} data-icon="inline-end" />
                </Link>
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
      <Suspense key={page} fallback={<TableLoading tableColumn={8} />}>
        <AnakTable {...usersTableProps} />
      </Suspense>
    </div>
  );
};

export default AnakPage;
