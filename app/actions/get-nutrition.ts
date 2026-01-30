"use server";

const API_URL = "https://api.tanduvia.com/rekomendasi-gizi"; // Sesuaikan URL aslinya

export async function getPersonalizedNutrition(
  usiaBulan: number,
  statusBBU: string,
  statusTBU: string
) {
  try {
    // Kita susun query params berdasarkan kondisi anak
    const params = new URLSearchParams();
    params.set("usia_bulan", usiaBulan.toString());
    
    // Kirim status ke backend (Backend yang akan filter mana rekomendasi yang cocok)
    params.set("status_bb_u", statusBBU); 
    params.set("status_tb_u", statusTBU);
    
    // Contoh URL: /rekomendasi-gizi?usia_bulan=34&status_bb_u=bb_sangat_kurang&status_tb_u=tinggi

    const res = await fetch(`${API_URL}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, data: [] };
    }

    return { success: true, data: data.data.data }; // Mengambil array dari dalam pagination "data"
  } catch (error) {
    console.error("Nutrition Fetch Error:", error);
    return { success: false, data: [] };
  }
}