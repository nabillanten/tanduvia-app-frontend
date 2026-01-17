import {DataTable} from "@/components/ui/table/data-table";
import {columns} from "./columns";
import TablePagination from "@/components/ui/table/table-pagination";
import fetchWithCredentials from "@/lib/fetchWithCredential";

type Props = {page: number; perPage: number; query: string};

async function findAllPosyandu(page: number, perPage: number, query: string) {
  const response = await fetchWithCredentials(
    `/posyandu?page=${page}&perPage=${perPage}&search=nama:${query}&sort=created_at%3Adesc`,
  );
  return response?.data;
}

const PosyanduTable = async (props: Props) => {
  const {page, perPage, query} = props;
  const posyandu = await findAllPosyandu(page, perPage, query);

  const count = posyandu?.count;
  const TablePaginationProps = {
    page,
    perPage,
    query,
    count,
  };
  return (
    <>
      <DataTable columns={columns} data={posyandu?.data ?? []} />
      <TablePagination {...TablePaginationProps} />
    </>
  );
};

export default PosyanduTable;
