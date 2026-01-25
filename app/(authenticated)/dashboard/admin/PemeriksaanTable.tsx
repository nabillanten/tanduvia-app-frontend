import {columns} from "./columns";
import fetchWithCredentials from "@/lib/fetchWithCredential";
import {DashboardTable} from "@/components/ui/table/dashboard-table";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

async function findAllPemeriksaan() {
  const response = await fetchWithCredentials(`/pemeriksaan`);
  return response?.data;
}

const PemeriksaanTable = async () => {
  const anak = await findAllPemeriksaan();
  const dataAnak = anak?.data.slice(0, 10);

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Pemeriksaan Terkini</CardTitle>
          <CardDescription>Tabel Daftar Pemeriksan Terkini</CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardTable columns={columns} data={dataAnak ?? []} />
        </CardContent>
      </Card>
    </>
  );
};

export default PemeriksaanTable;
