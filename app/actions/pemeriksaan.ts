"use server";

import fetchWithCredentials from "@/lib/fetchWithCredential";
import {revalidatePath} from "next/cache";

export const createPemeriksaan = async (body: object) => {
  const req = await fetchWithCredentials("/pemeriksaan", "POST", body);
  revalidatePath("/pemeriksaan");
  return req;
};

export const updatePemeriksaan = async (id: string, body: object) => {
  const req = await fetchWithCredentials("/pemeriksaan/" + id, "PATCH", body);
  revalidatePath("/pemeriksaan");
  return req;
};
