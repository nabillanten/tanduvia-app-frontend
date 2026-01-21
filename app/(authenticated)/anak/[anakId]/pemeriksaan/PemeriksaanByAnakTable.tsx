import {DataTable} from "@/components/ui/table/data-table";
import {columns} from "./columns";
import TablePagination from "@/components/ui/table/table-pagination";
import fetchWithCredentials from "@/lib/fetchWithCredential";

type Props = {page: number; perPage: number; query: string; anakId: string};

async function findPemeriksaanByAnak(
  page: number,
  perPage: number,
  query: string,
  id: string,
) {
  const response = await fetchWithCredentials(
    `/anak/${id}/pemeriksaan?page=${page}&pageSize=${perPage}&search=${query}`,
  );
  return response?.data;
}

const PemeriksaanByAnakTable = async (props: Props) => {
  const {page, perPage, query, anakId} = props;
  const anak = await findPemeriksaanByAnak(page, perPage, query, anakId);

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

export default PemeriksaanByAnakTable;
