"use server";
import {cookies} from "next/headers";
import {appConfig} from "../app-config";
import {jwtDecode} from "jwt-decode";
import { redirect } from "next/navigation";

interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  roles: string[];
}

export const login = async (body: {username: string; password: string}) => {
  const cookieStore = await cookies();
  
  try {
    const request = await fetch(appConfig.baseUrl + "/auth/login", {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    // Cek jika request gagal
    if (!request.ok) {
      return { 
        success: false, 
        message: response.message || "Username atau password salah" 
      };
    }

    // Jika Berhasil
    const decoded = jwtDecode<DecodedToken>(response?.access_token);
    const expiryDate = new Date(decoded.exp * 1000);

    // Tentukan Secure secara dinamis atau false untuk dev environment HTTP
    // Ubah logic ini sesuai environment Anda
    const isProduction = process.env.NODE_ENV === "production";

    cookieStore.set("access_token", response?.access_token, {
      httpOnly: true,
      secure: isProduction, // Pastikan FALSE jika akses via HTTP (dev.tanduvia.com)
      sameSite: "lax",      // PENTING: Lax membantu cookie terbawa saat redirect
      path: "/",
      expires: expiryDate,
    });

    cookieStore.set("refresh_token", response?.refresh_token, {
      httpOnly: true,
      secure: isProduction, 
      sameSite: "lax",
      path: "/",
      expires: expiryDate,
    });

    return { success: true };

  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Terjadi kesalahan koneksi" };
  }
};

// ... (Logout tetap sama, tapi hapus redirect, biarkan client yang redirect)
export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  redirect("/auth/signin");
  return { success: true };
};