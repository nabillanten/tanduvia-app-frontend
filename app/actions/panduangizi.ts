"use server";

import fetchWithCredentials from "@/lib/fetchWithCredential";
import {revalidatePath} from "next/cache";

export const createPanduanGizi = async (body: object) => {
  const req = await fetchWithCredentials("/rekomendasi-gizi", "POST", body);
  revalidatePath("/rekomendasi-gizi");
  return req;
};

export const updatePanduanGizi = async (id: string, body: object) => {
  const req = await fetchWithCredentials(
    "/rekomendasi-gizi/" + id,
    "PATCH",
    body,
  );
  revalidatePath("/rekomendasi-gizi");
  return req;
};

export const DeletePanduanGizi = async (id: string) => {
  const req = await fetchWithCredentials("/rekomendasi-gizi/" + id, "DELETE");
  revalidatePath("/rekomendasi-gizi");
  return req;
};
