import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  images: {
    domains: ["hanaolim-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;
