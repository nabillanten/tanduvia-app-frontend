"use server";

import {appConfig} from "../app-config";

const API_URL = `${appConfig.baseUrl}/rekomendasi-gizi`;

export async function getPersonalizedNutrition(
  usiaBulan: number,
  statusBBU: string,
  statusTBU: string,
) {
  try {
    const params = new URLSearchParams();
    params.set("usiaBulan", usiaBulan.toString());

    params.set("statusBBU", statusBBU);
    params.set("statusTBU", statusTBU);

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

    return {success: true, data: data.data.data};
  } catch (error) {
    console.error("Nutrition Fetch Error:", error);
    return {success: false, data: []};
  }
}
