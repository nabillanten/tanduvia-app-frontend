import fetchWithCredentials from "@/lib/fetchWithCredential";
import UpdateIbuForm from "./update-ibu-form";

async function findIbuById(id: string) {
  const response = await fetchWithCredentials(`/anak/ibu/${id}`);
  return response;
}

const UpdateIbuPage = async ({params}: {params: Promise<{ibuId: string}>}) => {
  const {ibuId} = await params;
  const ibu = await findIbuById(ibuId);

  return (
    <div>
      <UpdateIbuForm ibuId={ibuId} ibu={ibu?.data} />
    </div>
  );
};

export default UpdateIbuPage;
