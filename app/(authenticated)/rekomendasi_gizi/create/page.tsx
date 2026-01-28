import fetchWithCredentials from "@/lib/fetchWithCredential";
import React from "react";
import CreatePanduanGiziForm from "./create-panduangizi-form";
import FormLoading from "@/components/ui/form-loading";

async function getAllAhlliGizi() {
  const response = await fetchWithCredentials("/users?role=AHLI_GIZI");
  return response?.data;
}

const CreateGiziPage = async () => {
  const ahliGizi = await getAllAhlliGizi();
  return (
    <React.Suspense key={ahliGizi} fallback={<FormLoading />}>
      <CreatePanduanGiziForm ahliGizi={ahliGizi?.data} />
    </React.Suspense>
  );
};

export default CreateGiziPage;
