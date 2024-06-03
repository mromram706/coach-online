/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "localhost"],
    unoptimized: true,
  },
  distDir: "out",
  output: "export",
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      "/": { page: "/" },
      "/404": { page: "/404" },
      "/500": { page: "/500" },
      "/conocenos": { page: "/conocenos" },
      "/contactanos": { page: "/contactanos" },
      "/cookies-policy": { page: "/cookies-policy" },
      "/privacy-policy": { page: "/privacy-policy" },
      "/profile": { page: "/profile" },
      "/subscripcion": { page: "/subscripcion" },
      "/terms": { page: "/terms" },
    };
  },
};

export default nextConfig;
