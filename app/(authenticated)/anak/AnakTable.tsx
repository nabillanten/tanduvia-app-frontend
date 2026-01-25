import {DataTable} from "@/components/ui/table/data-table";
import {columns} from "./columns";
import TablePagination from "@/components/ui/table/table-pagination";
import fetchWithCredentials from "@/lib/fetchWithCredential";

type Props = {page: number; perPage: number; query: string};

async function findAllAnak(page: number, perPage: number, query: string) {
  const response = await fetchWithCredentials(
    `/anak?page=${page}&pageSize=${perPage}&search=${query}`,
  );
  return response?.data;
}

const AnakTable = async (props: Props) => {
  const {page, perPage, query} = props;
  const anak = await findAllAnak(page, perPage, query);

  const count = anak?.count;
  const TablePaginationProps = {
    page,
    perPage,
    query,
    count,
  };
  return (
    <>
      <DataTable columns={columns} data={anak?.data ?? []} />
      <TablePagination {...TablePaginationProps} />
    </>
  );
};

export default AnakTable;
