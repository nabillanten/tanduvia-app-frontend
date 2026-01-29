import fetchWithCredentials from "@/lib/fetchWithCredential";
import React, { Suspense } from "react";
import UpdatePanduanGiziForm from "./update-panduangizi-form";
import FormLoading from "@/components/ui/form-loading";

async function findPanduanGiziById(id: string) {
  const response = await fetchWithCredentials("/rekomendasi-gizi/" + id);
  return response;
}

async function getAllAhlliGizi() {
  const response = await fetchWithCredentials("/users?role=AHLI_GIZI");
  return response?.data;
}
const UpdatePanduanGiziPage = async ({
  params,
}: {
  params: Promise<{panduanGiziId: string}>;
}) => {
  const {panduanGiziId} = await params;
  const ahliGizi = await getAllAhlliGizi();
  const panduanGizi = await findPanduanGiziById(panduanGiziId);
  return (
   <Suspense key={ahliGizi + panduanGizi} fallback={<FormLoading/>}>
     <UpdatePanduanGiziForm
      panduanGiziId={panduanGiziId}
      panduanGizi={panduanGizi?.data}
      ahliGizi={ahliGizi?.data}
    />
   </Suspense>
  );
};

export default UpdatePanduanGiziPage;
