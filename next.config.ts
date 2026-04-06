import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '1prj038t8u.ufs.sh',
        port: '',
        pathname: '/**', // Use a glob pattern if images are in subdirectories
      },
    ],
  },
};

export default nextConfig;
