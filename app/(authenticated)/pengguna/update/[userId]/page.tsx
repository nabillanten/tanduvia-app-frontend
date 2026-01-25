import fetchWithCredentials from "@/lib/fetchWithCredential";
import UpdateUserForm from "./update-user-form";

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
    <div>
      <UpdateUserForm
        userId={userId}
        user={user?.data}
        posyandu={posyandu?.data}
      />
    </div>
  );
};

export default UpdateUserPage;
