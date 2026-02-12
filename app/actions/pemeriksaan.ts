"use server";

import fetchWithCredentials from "@/lib/fetchWithCredential";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

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

export const exportPemeriksaanToCSV = async (
  posyandu_id: string,
  quarter: string,
  year : string,
  safePosyanduName : string
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(
    `${API_URL}/pemeriksaan/anthropometric-export?posyandu_id=${posyandu_id}&quarter=${quarter}&year=${year}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  // Cek jika backend error
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Backend Error Response:", errorText);
    throw new Error(
      `Gagal download: ${response.status} ${response.statusText}`,
    );
  }

  // Deteksi Tipe Konten
  const contentType = response.headers.get("content-type") || "";
  console.log("Backend Content-Type:", contentType);

  let extension = "xlsx"; // Default
  if (contentType.includes("csv") || contentType.includes("text")) {
    extension = "csv";
  } else if (contentType.includes("json")) {
    throw new Error("Backend mengembalikan JSON, bukan File.");
  }

  // Ambil Binary Data
  const arrayBuffer = await response.arrayBuffer();

  // Convert ke Base64
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");

  return {
    success: true,
    data: base64,
    contentType: contentType,
    filename: `laporan_pemeriksaan-${safePosyanduName}-${quarter}-${year}.${extension}`,
  };
};
