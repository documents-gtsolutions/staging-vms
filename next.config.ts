// next.config.mjs
import nextPWA from 'next-pwa'

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // @ts-ignore - runtimeCaching support varies by version
  runtimeCaching: [
    // Navigation - prioritize network for faster routing
    {
      urlPattern: ({ request }: { request: Request }) => request.mode === 'navigate',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'html-pages',
        networkTimeoutSeconds: 3, // Reduced timeout
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 5 }, // 5 minutes
      },
    },
    // Static assets - cache first for performance
    {
      urlPattern: /^\/_next\/static\//,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-resources',
        expiration: { maxEntries: 32, maxAgeSeconds: 86400 },
      },
    },
    // API routes - network first with short cache
    {
      urlPattern: /^\/api\//,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 2,
        expiration: { maxEntries: 20, maxAgeSeconds: 60 }, // 1 minute
      },
    },
  ],
})

const nextConfig = {
  reactStrictMode: true,
}

export default withPWA(nextConfig)