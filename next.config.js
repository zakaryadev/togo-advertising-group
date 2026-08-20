/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xzuychvpjtfdmhzwpktn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/insta",
        destination: "/insta.html",
      },
    ];
  },
};

module.exports = nextConfig;
