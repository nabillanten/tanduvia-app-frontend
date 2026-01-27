import {DataTable} from "@/components/ui/table/data-table";
import {columns} from "./columns";
import TablePagination from "@/components/ui/table/table-pagination";
import fetchWithCredentials from "@/lib/fetchWithCredential";

// 1. Tambahkan prop tanggal (string format YYYY-MM-DD)
type Props = {
  page: number;
  perPage: number;
  query: string;
  posyanduId?: string;
  tanggal?: string; // <-- Tambahan baru
};

async function findAllPemeriksaan(
  page: number,
  perPage: number,
  query: string,
  posyanduId?: string,
  tanggal?: string, // <-- Tambahan argumen
) {
  const params = new URLSearchParams();

  params.set("page", page.toString());
  params.set("pageSize", perPage.toString());

  if (query) params.set("search", query);
  if (posyanduId) params.set("posyanduId", posyanduId);

  // 2. Set parameter tanggal hanya jika ada valuenya
  if (tanggal) params.set("tanggalPemeriksaan", tanggal);

  const response = await fetchWithCredentials(
    `/pemeriksaan?${params.toString()}`,
  );
  return response?.data;
}

const PemeriksaanTable = async (props: Props) => {
  // 3. Destructure tanggal dari props
  const {page, perPage, query, posyanduId, tanggal} = props;

  // 4. Pass ke fungsi fetch
  const anak = await findAllPemeriksaan(
    page,
    perPage,
    query,
    posyanduId,
    tanggal,
  );

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

export default PemeriksaanTable;
