import {NextResponse, NextRequest} from "next/server";
import {jwtDecode} from "jwt-decode";

// 1. Definisikan Tipe Data Token
interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  roles: string[];
}

// 2. Definisi Hak Akses
const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPERADMIN: [
    "/dashboard",
    "/pengguna",
    "/anak",
    "/ibu",
    "/posyandu",
    "/panduan_gizi",
    "/pemeriksaan",
  ],
  AHLI_GIZI: ["/dashboard", "/rekomendasi_gizi", "/riwayat_pemeriksaan","/anak"],
  PETUGAS: ["/dashboard", "/anak", "/ibu", "/pemeriksaan"],
};

export async function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const access_token = request.cookies.get("access_token")?.value;

  // Public Routes
  if (pathname === "/" || pathname === "/pertumbuhan_anak") {
    return NextResponse.next();
  }

  // --- LOGIC 1: Belum Login ---
  if (!access_token) {
    if (!pathname.startsWith("/auth")) {
      return redirectToSignin(request);
    }
    return NextResponse.next();
  }

  // --- LOGIC 2: Cek Validitas & Expiration ---
  try {
    const decoded = jwtDecode<DecodedToken>(access_token);

    // Cek apakah token sudah expired
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      console.warn("Token expired, redirecting to signin...");
      return redirectToSignin(request);
    }

    // --- LOGIC 3: RBAC (Sudah Login & Belum Expired) ---
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const userRoles = decoded.roles || [];
    const allowedPaths = userRoles.flatMap(
      (role) => ROLE_PERMISSIONS[role] || [],
    );
    const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch (error) {
    console.error("Token invalid or corrupted:", error);
    return redirectToSignin(request);
  }

  return NextResponse.next();
}

// Helper function
function redirectToSignin(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/auth/signin", request.url));
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  return response;
}
export const config = {
  // Matcher mengecualikan file statis & api
  matcher: [
    "/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\..*).*)",
  ],
};
