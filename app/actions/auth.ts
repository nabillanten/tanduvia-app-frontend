"use server";
import {cookies} from "next/headers";
import {appConfig} from "../app-config";
import {redirect} from "next/navigation";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  roles: string[];
}

export const login = async (body: {username: string; password: string}) => {
  const cookie = await cookies();
  const request = await fetch(appConfig.baseUrl + "/auth/login", {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const response = await request.json();
  if (request?.ok) {
    const decoded = jwtDecode<DecodedToken>(response?.access_token);

    const expiryDate = new Date(decoded.exp * 1000);

    cookie.set("access_token", response?.access_token, {
      // secure: true,
      httpOnly: true,
      expires: expiryDate,
      path: "/",
    });

    cookie.set("refresh_token", response?.refresh_token, {
      // secure: true,
      httpOnly: true,
      expires: expiryDate,
      path: "/",
    });

    return response;
  }
};

export const logout = async () => {
  const cookie = await cookies();
  cookie.delete("access_token");
  cookie.delete("refresh_token");
  return redirect("/auth/signin");
};
