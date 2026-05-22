import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Wajib untuk deploy ke GitHub Pages
  images: {
    unoptimized: true, // Wajib agar gambar tidak error saat diexport
  },
};

export default nextConfig;
