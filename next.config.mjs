/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: '/projects',
        destination: '/projects/websites',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
