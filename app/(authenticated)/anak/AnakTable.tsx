import {DataTable} from "@/components/ui/table/data-table";
import {columns} from "./columns";
import TablePagination from "@/components/ui/table/table-pagination";
import {mockAnak} from "@/app/mock-data/mock-anak";


type Props = {page: number; perPage: number; query: string};

const AnakTable = async (props: Props) => {
  const {page, perPage, query} = props;
  //   const users = await findAllUsers(page, perPage, query)
  const anak = {data: mockAnak, count: 0};
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
