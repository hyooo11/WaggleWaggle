/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://ec2-3-35-210-207.ap-northeast-2.compute.amazonaws.com:8080/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
