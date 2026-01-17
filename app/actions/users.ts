"use server";

import fetchWithCredentials from "@/lib/fetchWithCredential";
import {revalidatePath} from "next/cache";

export const createUser = async (body: object) => {
  const req = await fetchWithCredentials("/users", "POST", body);
  revalidatePath("/users");
  return req;
};

export const updateUser = async (id: string, body: object) => {
  const req = await fetchWithCredentials("/users/" + id, "PATCH", body);
  revalidatePath("/users");
  return req;
};

export const DeleteUser = async (id: string) => {
  const req = await fetchWithCredentials("/users/" + id, "DELETE");
  revalidatePath("/users");
  return req;
};
