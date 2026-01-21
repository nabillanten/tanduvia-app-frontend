"use server";

import fetchWithCredentials from "@/lib/fetchWithCredential";
import {revalidatePath} from "next/cache";

export const calculateZScore = async (body: object) => {
  const req = await fetchWithCredentials(
    "/pemeriksaan/calculate-z-score",
    "POST",
    body,
  );
  revalidatePath("/pemeriksaan");
  return req;
};
