"use server";

import {appConfig} from "../app-config";

const API_URL = `${appConfig.baseUrl}/rekomendasi-gizi`; // Sesuaikan URL aslinya

export async function getPersonalizedNutrition(
  usiaBulan: number,
  statusBBU: string,
  statusTBU: string,
) {
  try {
    // Kita susun query params berdasarkan kondisi anak
    const params = new URLSearchParams();
    params.set("usiaBulan", usiaBulan.toString());

    // Kirim status ke backend (Backend yang akan filter mana rekomendasi yang cocok)
    params.set("statusBBU", statusBBU);
    params.set("statusTBU", statusTBU);

    // Contoh URL: /rekomendasi-gizi?usiaBulan=34&statusBBU=bb_sangat_kurang&statusTBU=tinggi

    const res = await fetch(`${API_URL}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {success: false, data: []};
    }

    return {success: true, data: data.data.data}; // Mengambil array dari dalam pagination "data"
  } catch (error) {
    console.error("Nutrition Fetch Error:", error);
    return {success: false, data: []};
  }
}
