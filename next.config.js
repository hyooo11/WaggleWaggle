/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://naveropenapi.apigw.ntruss.com/:path*",
      },
      {
        source: "/api/:path*",
        destination:
          "http://ec2-3-35-210-207.ap-northeast-2.compute.amazonaws.com:8080/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "winetoy.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
