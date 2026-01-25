import fetchWithCredentials from "@/lib/fetchWithCredential";
import CreateAnakForm from "./create-anak-form";
import {Suspense} from "react";
import FormLoading from "@/components/ui/form-loading";

async function findAllIbu() {
  const response = await fetchWithCredentials(`/anak/ibu`);
  return response?.data;
}

const CreateAnakPage = async () => {
  const ibu = await findAllIbu();

  return (
    <Suspense key={ibu} fallback={<FormLoading />}>
      <CreateAnakForm ibu={ibu?.data} />
    </Suspense>
  );
};

export default CreateAnakPage;
