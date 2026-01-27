import fetchWithCredentials from "@/lib/fetchWithCredential";

import {Suspense} from "react";
import FormLoading from "@/components/ui/form-loading";
import UpdateAnakForm from "./update-anak-form";

async function findAllIbu(ibuId: string) {
  const response = await fetchWithCredentials(`/anak/ibu/${ibuId}`);
  return response?.data;
}

async function findAnakById(id: string) {
  const response = await fetchWithCredentials(`/anak/${id}`);
  return response?.data;
}

const UpdateIbuPage = async ({
  params,
}: {
  params: Promise<{anakId: string; ibuId: string}>;
}) => {
  const {anakId, ibuId} = await params;
  const anak = await findAnakById(anakId);
  const ibu = await findAllIbu(ibuId);

  return (
    <Suspense key={anak} fallback={<FormLoading />}>
      <UpdateAnakForm anakId={anakId} anak={anak} ibu={ibu} />
    </Suspense>
  );
};

export default UpdateIbuPage;
