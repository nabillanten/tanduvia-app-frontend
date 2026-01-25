import {appConfig} from "@/app/app-config";
import {cookies} from "next/headers";

export default async function fetchWithCredentials(
  endPoint: string,
  method: string = "GET",
  body?: object,
) {
  const cookie = await cookies();
  const access_token = cookie.get("access_token")?.value;

  try {
    const req = await fetch(appConfig.baseUrl + endPoint, {
      method: method,
      headers: {
        "Content-Type": " application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const res = await req.json();
    return res;
  } catch (error) {
    return error;
  }
}
