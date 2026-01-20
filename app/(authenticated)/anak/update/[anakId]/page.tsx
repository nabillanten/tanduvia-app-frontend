import fetchWithCredentials from "@/lib/fetchWithCredential";
import UpdateAnakForm from "./update-anak-form";

async function findAllIbu() {
  const response = await fetchWithCredentials(`/anak/ibu`);
  return response?.data;
}

async function findAnakById(id: string) {
  const response = await fetchWithCredentials(`/anak/${id}`);
  return response;
}

const UpdateIbuPage = async ({params}: {params: Promise<{anakId: string}>}) => {
  const {anakId} = await params;
  const anak = await findAnakById(anakId);
  const ibu = await findAllIbu();

  return (
    <div>
      <UpdateAnakForm anakId={anakId} anak={anak?.data} ibu={ibu?.data} />
    </div>
  );
};

export default UpdateIbuPage;
