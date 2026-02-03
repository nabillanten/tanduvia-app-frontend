import type {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Applebot", "Bingbot", "Googlebot"],
        allow: ["/"],
        disallow: [
          "/dashboard",
          "/pengguna",
          "/anak",
          "/ibu",
          "/posyandu",
          "/panduan_gizi",
          "/pemeriksaan",
          "/rekomendasi_gizi",
        ],
      },
    ],
    sitemap: "https://tanduvia.com/sitemap.xml",
  };
}
