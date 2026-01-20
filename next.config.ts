import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", "192.168.100.175"],
};

export default nextConfig;
