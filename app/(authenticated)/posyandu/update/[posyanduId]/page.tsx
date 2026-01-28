import fetchWithCredentials from "@/lib/fetchWithCredential";
import UpdatePosyanduForm from "./update-posyandu-form";
import React from "react";
import FormLoading from "@/components/ui/form-loading";

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
    <React.Suspense key={posyandu} fallback={<FormLoading />}>
      <UpdatePosyanduForm posyanduId={posyanduId} posyandu={posyandu?.data} />
    </React.Suspense>
  );
};

export default UpdatePosyanduPage;
