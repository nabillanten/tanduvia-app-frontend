import fetchWithCredentials from "@/lib/fetchWithCredential";
import UpdatePosyanduForm from "./update-posyandu-form";

async function findPosyaduById(id: string) {
  const response = await fetchWithCredentials(`/posyandu/${id}`);
  return response;
}

const UpdatePosyanduPage = async ({
  params,
}: {
  params: Promise<{posyanduId: string}>;
}) => {
  const {posyanduId} = await params;
  const posyandu = await findPosyaduById(posyanduId);

  return (
    <div>
      <UpdatePosyanduForm posyanduId={posyanduId} posyandu={posyandu?.data} />
    </div>
  );
};

export default UpdatePosyanduPage;
