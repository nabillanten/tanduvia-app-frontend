"use server";

import fetchWithCredentials from "@/lib/fetchWithCredential";
import {revalidatePath} from "next/cache";

export const createIbu = async (body: object) => {
  const req = await fetchWithCredentials("/anak/ibu", "POST", body);
  revalidatePath("/ibu");
  return req;
};

export const updateIbu = async (id: string, body: object) => {
  const req = await fetchWithCredentials("/anak/ibu/" + id, "PATCH", body);
  revalidatePath("/ibu");
  return req;
};

export const DeleteIbu = async (id: string) => {
  const req = await fetchWithCredentials("/anak/ibu/" + id, "DELETE");
  revalidatePath("/ibu");
  return req;
};
