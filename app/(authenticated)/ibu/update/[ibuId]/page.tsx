import fetchWithCredentials from "@/lib/fetchWithCredential";
import UpdateIbuForm from "./update-ibu-form";
import { Suspense } from "react";
import FormLoading from "@/components/ui/form-loading";

async function findIbuById(id: string) {
  const response = await fetchWithCredentials(`/anak/ibu/${id}`);
  return response;
}

const UpdateIbuPage = async ({params}: {params: Promise<{ibuId: string}>}) => {
  const {ibuId} = await params;
  const ibu = await findIbuById(ibuId);

  return (
    <Suspense key={ibu} fallback={<FormLoading/>}>
      <UpdateIbuForm ibuId={ibuId} ibu={ibu?.data} />
    </Suspense>
  );
};

export default UpdateIbuPage;
