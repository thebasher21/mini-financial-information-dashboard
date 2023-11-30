/** @type {import('next').NextConfig} */
const nextConfig = {
  generateStaticParams: async () => {
    return {
      "/": { page: "/" },
      "/pages/login": { page: "/pages/login" },
    };
  },
};

module.exports = nextConfig;
