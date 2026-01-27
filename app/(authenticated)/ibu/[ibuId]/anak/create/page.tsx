import {Suspense} from "react";
import CreateAnakForm from "./create-anak-form";
import FormLoading from "@/components/ui/form-loading";
import fetchWithCredentials from "@/lib/fetchWithCredential";

async function findIbuById(id: string) {
  const response = await fetchWithCredentials(`/anak/ibu/${id}`);
  return response?.data;
}

const CreateAnakByIbuIdPage = async ({
  params,
}: {
  params: Promise<{ibuId: string}>;
}) => {
  const {ibuId} = await params;
  const dataIbu = await findIbuById(ibuId);

  return (
    <Suspense key={ibuId} fallback={<FormLoading />}>
      <CreateAnakForm dataIbu={dataIbu} />
    </Suspense>
  );
};

export default CreateAnakByIbuIdPage;
