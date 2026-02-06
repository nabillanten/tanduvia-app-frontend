import TableLoading from "@/components/ui/table/table-loading";
import React from "react";
import PemeriksaanTable from "./PemeriksaanTable";
import FilterSelect from "@/components/ui/FilterSelect";
import {DateFilter} from "@/components/ui/Datefilter";
import fetchWithCredentials from "@/lib/fetchWithCredential";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import ExportToCSV from "@/components/ui/ExportToCSV";

type PageProps = {
  searchParams: {[key: string]: string | string[] | undefined};
};

async function findAllPosyadu() {
  const response = await fetchWithCredentials(`/posyandu`);
  return response?.data;
}

const PemeriksaanPage = async (props: {searchParams: PageProps}) => {
  // const searchParams = await props.searchParams;
  const searchParams = await props.searchParams;

  // @ts-expect-error type
  const page = Number(searchParams?.page) || 1;
  // @ts-expect-error type
  const perPage = Number(searchParams?.perPage) || 15;
  // @ts-expect-error type
  const query = (searchParams?.q as string) || "";
  // @ts-expect-error type
  const posyanduId = (searchParams?.posyandu_id as string) || "";
  // @ts-expect-error type
  const tanggal = (searchParams?.tanggal as string) || "";

  const dataPosyandu = await findAllPosyadu();

  const PemreiksaanTableProps = {
    page,
    perPage,
    query,
    posyanduId,
    tanggal,
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <h1 className="text-lg font-bold shrink-0">Daftar Pemeriksaan</h1>
        <div className="flex justify-between gap-2 items-center w-full">
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Filter Tanggal */}
            <DateFilter />

            {/* Filter Posyandu */}
            <FilterSelect data={dataPosyandu?.data} />

            <ExportToCSV data={dataPosyandu?.data}/>
          </div>
          <Link href={"/pemeriksaan/create"}>
            <Button>
              <PlusIcon /> <span>Baru</span>
            </Button>
          </Link>
        </div>
      </div>
      <React.Suspense
        key={page + posyanduId + tanggal}
        fallback={<TableLoading tableColumn={10} />}>
        <PemeriksaanTable {...PemreiksaanTableProps} />
      </React.Suspense>
    </div>
  );
};

export default PemeriksaanPage;
