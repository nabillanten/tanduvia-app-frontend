import {DataTable} from "@/components/ui/table/data-table";
import {columns} from "./columns";
import TablePagination from "@/components/ui/table/table-pagination";
import {mockUsers} from "@/app/mock-data/mock-users";

type Props = {page: number; perPage: number; query: string};

const UsersTable = async (props: Props) => {
  const {page, perPage, query} = props;
  //   const users = await findAllUsers(page, perPage, query)
  const users = {data: mockUsers, count: 0};
  const route = "/cms/users";
  const count = users?.count;
  const TablePaginationProps = {
    page,
    perPage,
    query,
    route,
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
