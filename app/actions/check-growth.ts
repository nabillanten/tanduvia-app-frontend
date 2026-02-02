"use server";

import { appConfig } from "../app-config";

// Sesuaikan URL API
const API_URL = `${appConfig.baseUrl}/anak/ibu/pemeriksaan`;

interface CheckPayload {
  nik: string;
  nama: string;
  tanggal_lahir: string; // Format ISO
}

export async function checkGrowth(payload: CheckPayload) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Tambahkan header lain jika perlu (misal API Key public)
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Gagal mengambil data.",
      };
    }

    return {
      success: true,
      data: data.data, // Array children
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan koneksi server.",
    };
  }
}
