import {DataTable} from "@/components/ui/table/data-table";
import {columns} from "./columns";
import TablePagination from "@/components/ui/table/table-pagination";
import { mockRekomendasiGizi } from "@/app/mock-data/mock-panduan-gizi";



type Props = {page: number; perPage: number; query: string};

const PanduanGiziTable = async (props: Props) => {
  const {page, perPage, query} = props;
  //   const users = await findAllUsers(page, perPage, query)
  const anak = {data: mockRekomendasiGizi, count: 0};
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

export default PanduanGiziTable;
