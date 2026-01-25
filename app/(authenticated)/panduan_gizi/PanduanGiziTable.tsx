import {DataTable} from "@/components/ui/table/data-table";
import {columns} from "./columns";
import TablePagination from "@/components/ui/table/table-pagination";
import fetchWithCredentials from "@/lib/fetchWithCredential";

type Props = {page: number; perPage: number; query: string};

async function findAllPanduanGizi(
  page: number,
  perPage: number,
  query: string,
) {
  const response = await fetchWithCredentials(
    `/rekomendasi-gizi?page=${page}&pageSize=${perPage}&search=${query}`,
  );
  return response?.data;
}

const PanduanGiziTable = async (props: Props) => {
  const {page, perPage, query} = props;
  const panduanGizi = await findAllPanduanGizi(page, perPage, query);
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
