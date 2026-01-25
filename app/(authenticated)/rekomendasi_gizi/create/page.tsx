import fetchWithCredentials from "@/lib/fetchWithCredential";
import React from "react";
import CreatePanduanGiziForm from "./create-panduangizi-form";

async function getAllAhlliGizi() {
  const response = await fetchWithCredentials("/users?role=AHLI_GIZI");
  return response?.data;
}

const CreateGiziPage = async () => {
  const ahliGizi = await getAllAhlliGizi();
  return <CreatePanduanGiziForm ahliGizi={ahliGizi?.data} />;
};

export default CreateGiziPage;
