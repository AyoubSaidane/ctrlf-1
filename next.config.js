/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Support for PDF files
    config.module.rules.push({
      test: /\.pdf$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://7990-157-131-222-207.ngrok-free.app/:path*',
      },
    ];
  },
  images: {
    domains: ['api.dicebear.com'],
  },
}

module.exports = nextConfig
