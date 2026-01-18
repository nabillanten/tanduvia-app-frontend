import {DataTable} from "@/components/ui/table/data-table";
import {columns} from "./columns";
import TablePagination from "@/components/ui/table/table-pagination";
import fetchWithCredentials from "@/lib/fetchWithCredential";

type Props = {page: number; perPage: number; query: string};

async function findAllUsers(page: number, perPage: number, query: string) {
  const response = await fetchWithCredentials(
    `/users?page=${page}&pageSize=${perPage}&search=${query}`,
  );
  return response?.data;
}

const UsersTable = async (props: Props) => {
  const {page, perPage, query} = props;
  const users = await findAllUsers(page, perPage, query);

  const count = users?.count;
  const TablePaginationProps = {
    page,
    perPage,
    query,
    count,
  };
  return (
    <>
      <DataTable columns={columns} data={users?.data ?? []} />
      <TablePagination {...TablePaginationProps} />
    </>
  );
};

export default UsersTable;
