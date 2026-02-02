import {DataTable} from "@/components/ui/table/data-table";
import {columns} from "./columns";
import TablePagination from "@/components/ui/table/table-pagination";
import fetchWithCredentials from "@/lib/fetchWithCredential";

type Props = {
  page: number;
  perPage: number;
  query: string;
  status: string;
};

async function findAllPanduanGizi(
  page: number,
  perPage: number,
  query: string,
  status: string,
) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: perPage.toString(),
  });

  // Cek query search, kalau ada baru di-append
  if (query) {
    params.append("search", query);
  }

  // Cek status
  // Hanya append ke URL jika status ada isinya
  if (status && status !== "all") {
    params.append("status", status);
  }

  // Gabungkan jadi string URL yang bersih
  const response = await fetchWithCredentials(
    `/rekomendasi-gizi?${params.toString()}`,
  );

  return response?.data;
}

const PanduanGiziTable = async (props: Props) => {
  const {page, perPage, query, status} = props;

  const panduanGizi = await findAllPanduanGizi(page, perPage, query, status);
  const count = panduanGizi?.count;

  const TablePaginationProps = {
    page,
    perPage,
    query,
    count,
  };

  return (
    <>
      <DataTable columns={columns} data={panduanGizi?.data ?? []} />
      <TablePagination {...TablePaginationProps} />
    </>
  );
};

export default PanduanGiziTable;
