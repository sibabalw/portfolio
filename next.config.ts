import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'placeholderimages.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      {protocol: "http", hostname: "localhost"},
      {protocol: "https", hostname: "source.unsplash.com"},
      {protocol: "https", hostname: "lh3.googleusercontent.com"},
      {protocol: "https", hostname: "avatar.githubusercontent.com"},
      {protocol: "https", hostname: "agraph.facebook.com"},
      {protocol: "https", hostname: "www.google.com"},
      {protocol: "https", hostname: "ubuntu-lend.azurewebsites.net"},
      {protocol: "https", hostname: "ubuntu-lend.com"},
      {protocol: "https", hostname: "ubuntu-lend.co.za"},
    ],
    unoptimized: true,
  },
};

export default nextConfig;
