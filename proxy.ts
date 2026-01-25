import {NextResponse, NextRequest} from "next/server";
import {jwtDecode} from "jwt-decode";

// 1. Definisikan Tipe Data Token sesuai hasil console.log Anda
interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  roles: string[];
}

// 2. Definisi Hak Akses (Sesuaikan path/slug dengan folder app Anda)
const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPERADMIN: [
    "/dashboard",
    "/pengguna",
    "/anak",
    "/ibu",
    "/posyandu",
    "/panduan_gizi",
    "/pemeriksaan",
    "/admin",
  ],
  AHLI_GIZI: ["/ahli_gizi", "/dashboard", "/rekomendasi_gizi", "/admin"],
  PETUGAS: ["/petugas", "/dashboard", "/anak", "/ibu", "/pemeriksaan"],
};

export async function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const access_token = request.cookies.get("access_token")?.value;

  // Handle Root Path "/"
  if (pathname === "/") {
    return NextResponse.next();
  }

  // --- LOGIC 1: Cek Login (Belum ada Token) ---
  if (!access_token) {
    if (!pathname.startsWith("/auth")) {
      const response = NextResponse.redirect(
        new URL("/auth/signin", request.url),
      );
      // Bersihkan cookie kotor jika ada
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      return response;
    }
    return NextResponse.next();
  }

  // --- LOGIC 2: Sudah Login (Cek Redirect Auth) ---
  if (pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // --- LOGIC 3: Role Based Access Control (RBAC) ---
  try {
    // Decode token menggunakan library
    const decoded = jwtDecode<DecodedToken>(access_token);

    // Ambil roles dari token (Array)
    const userRoles = decoded.roles || [];

    // Kumpulkan SEMUA path yang boleh diakses oleh user berdasarkan role-rolenya
    // (Jika user punya 2 role, kita gabungkan permission-nya)
    const allowedPaths = userRoles.flatMap(
      (role) => ROLE_PERMISSIONS[role] || [],
    );

    // Cek apakah path saat ini diizinkan
    // Kita gunakan startsWith agar sub-path juga bisa diakses (misal: /anak/create)
    const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));

    // Jika akses DITOLAK
    if (!isAllowed) {
      console.warn(
        `Access Denied: Roles [${userRoles}] tried to access ${pathname}`,
      );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch (error) {
    // Jika token tidak valid atau gagal decode, lempar ke login
    console.error("Token invalid:", error);
    const response = NextResponse.redirect(
      new URL("/auth/signin", request.url),
    );
    response.cookies.delete("access_token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Matcher mengecualikan file statis & api
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
