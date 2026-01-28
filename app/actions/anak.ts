"use server";

import fetchWithCredentials from "@/lib/fetchWithCredential";
import {revalidatePath} from "next/cache";

export const createAnak = async (body: object) => {
  const req = await fetchWithCredentials("/anak", "POST", body);
  revalidatePath("/anak");
  return req;
};

export const updateAnak = async (id: string, body: object) => {
  const req = await fetchWithCredentials("/anak/" + id, "PATCH", body);
  revalidatePath("/anak");
  return req;
};

export const DeleteAnak = async (id: string) => {
  const req = await fetchWithCredentials("/anak/" + id, "DELETE");
  revalidatePath("/anak");
  return req;
};

export const getAnakByRFID = async (rfid: string) => {
  const req = await fetchWithCredentials("/anak?search=" + rfid);
  return req;
};

export const getPertumbuhanAnak = async (body: object) => {
  const req = await fetchWithCredentials(
    "/anak/ibu/pemeriksaan/",
    "POST",
    body,
  );
  // revalidatePath("/pertumbuhan_anak");
  return req;
};
