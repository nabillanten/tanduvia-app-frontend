import fetchWithCredentials from "@/lib/fetchWithCredential";
import React from "react";
import CreatePanduanGiziForm from "./create-panduangizi-form";

async function getAllAhlliGizi() {
  const response = await fetchWithCredentials("/users");
  return response?.data;
}

const CreateGiziPage = async () => {
  const user = await getAllAhlliGizi();
  const ahliGizi = user?.data?.filter(
    (user: {role: string}) => user.role === "AHLI_GIZI",
  );
  return <CreatePanduanGiziForm ahliGizi={ahliGizi} />;
};

export default CreateGiziPage;
