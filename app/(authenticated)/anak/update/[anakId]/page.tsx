import fetchWithCredentials from "@/lib/fetchWithCredential";
import UpdateAnakForm from "./update-anak-form";
import {Suspense} from "react";
import FormLoading from "@/components/ui/form-loading";

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
    <Suspense key={anak} fallback={<FormLoading />}>
      <UpdateAnakForm anakId={anakId} anak={anak?.data} ibu={ibu?.data} />
    </Suspense>
  );
};

export default UpdateIbuPage;
