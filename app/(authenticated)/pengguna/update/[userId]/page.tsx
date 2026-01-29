import fetchWithCredentials from "@/lib/fetchWithCredential";
import UpdateUserForm from "./update-user-form";
import { Suspense } from "react";
import FormLoading from "@/components/ui/form-loading";

async function findUserById(id: string) {
  const response = await fetchWithCredentials(`/users/${id}`);
  return response;
}

async function findAllPosyadu() {
  const response = await fetchWithCredentials(`/posyandu`);
  return response?.data;
}

const UpdateUserPage = async ({
  params,
}: {
  params: Promise<{userId: string}>;
}) => {
  const {userId} = await params;
  const user = await findUserById(userId);
  const posyandu = await findAllPosyadu();

  return (
    <Suspense key={user + posyandu} fallback={<FormLoading/>}>
      <UpdateUserForm
        userId={userId}
        user={user?.data}
        posyandu={posyandu?.data}
      />
    </Suspense>
  );
};

export default UpdateUserPage;
