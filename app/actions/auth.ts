"use server";
import {cookies} from "next/headers";
import {appConfig} from "../app-config";
import {redirect} from "next/navigation";

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
    cookie.set("access_token", response?.access_token, {
      // secure: true,
      //   httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 1,
      path: "/",
    });
    cookie.set("refresh_token", response?.refresh_token, {
      // secure: true,
      //   httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 1,
      path: "/",
    });
  }

  return response;
};

export const logout = async () => {
  const cookie = await cookies();
  cookie.delete("access_token");
  cookie.delete("refresh_token");
  return redirect("/auth/signin");
};
