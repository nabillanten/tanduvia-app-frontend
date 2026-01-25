import {DataTable} from "@/components/ui/table/data-table";
import {columns} from "./columns";
import fetchWithCredentials from "@/lib/fetchWithCredential";

async function findAllPosyandu() {
  const response = await fetchWithCredentials(`/posyandu`);
  return response?.data;
}

const PosyanduTable = async () => {
  const posyandu = await findAllPosyandu();

  return (
    <>
      <DataTable columns={columns} data={posyandu?.data ?? []} />
    </>
  );
};

export default PosyanduTable;
