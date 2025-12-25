/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // unsafe-eval: Required by Recharts for dynamic chart rendering
              // unsafe-inline: Required by @react-pdf/renderer and Recharts for inline styles
              // TODO: Implement nonces for inline scripts when possible
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              // unsafe-inline: Required by Tailwind CSS and @react-pdf/renderer
              "style-src 'self' 'unsafe-inline'",
              // data:: Required for base64 encoded images in PDFs and charts
              // images.unsplash.com: Product images from Unsplash
              // TODO: Add Supabase Storage domain when configured
              "img-src 'self' data: https://images.unsplash.com",
              // data:: Required for custom fonts in PDFs
              "font-src 'self' data:",
              // TODO: Add Supabase domain when configured
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              // Report CSP violations to monitor security issues
              // TODO: Configure report-uri endpoint for production monitoring
            ].join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
