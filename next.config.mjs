const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "localhost"],
    unoptimized: true,
  },
  distDir: "out",
  output: "export",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false };
    }
    return config;
  },
};

export default nextConfig;
