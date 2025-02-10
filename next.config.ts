  import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com','cdn.dorahacks.io','aceternity.com','violet-wrong-herring-709.mypinata.cloud','i.seadn.io','static-files.risein.com','images.unsplash.com','assets.aceternity.com'],
    
  },
  eslint: {
    ignoreDuringBuilds: true,
},
typescript: {
  // !! WARN !!
  // Dangerously allow production builds to successfully complete even if
  // your project has type errors.
  // !! WARN !!
  ignoreBuildErrors: true,
},

};

export default nextConfig;
