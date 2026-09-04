import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Short partner links: slides.enervit.online/heliasport -> /p/heliasport
      { source: '/heliasport', destination: '/p/heliasport', permanent: false },
    ];
  },
};

export default nextConfig;
