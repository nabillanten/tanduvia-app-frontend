import fetchWithCredentials from "@/lib/fetchWithCredential";
import CreateUserForm from "./create-pengguna-form";
import {Suspense} from "react";
import FormLoading from "@/components/ui/form-loading";

async function findAllPosyadu() {
  const response = await fetchWithCredentials(`/posyandu`);
  return response?.data;
}

const UpdateUserPage = async () => {
  const posyandu = await findAllPosyadu();

  return (
    <Suspense key={posyandu} fallback={<FormLoading />}>
      <CreateUserForm posyandu={posyandu?.data} />
    </Suspense>
  );
};

export default UpdateUserPage;
