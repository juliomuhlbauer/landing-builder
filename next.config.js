/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/new",
        destination: "/build/new",
        permanent: true,
      },
    ];
  },
};
