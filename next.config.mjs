/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/api/:path*', // Apply to all API routes
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*', 
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, POST, PATCH, DELETE, OPTIONS',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'Content-Type, Authorization',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  