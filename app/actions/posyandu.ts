"use server";

import fetchWithCredentials from "@/lib/fetchWithCredential";
import {revalidatePath} from "next/cache";

export const createPosyandu = async (body: object) => {
  const req = await fetchWithCredentials("/posyandu", "POST", body);
  revalidatePath("/posyandu");
  return req;
};

export const updatePosyandu = async (id: string, body: object) => {
  const req = await fetchWithCredentials("/posyandu/" + id, "PATCH", body);
  revalidatePath("/posyandu");
  return req;
};

export const DeletePosyandu = async (id: string) => {
  const req = await fetchWithCredentials("/posyandu/" + id, "DELETE");
  revalidatePath("/posyandu");
  return req;
};
