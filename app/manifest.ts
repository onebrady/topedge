import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Top Edge Car Washes',
    short_name: 'Top Edge',
    description: 'Premium Express Car Wash - Tampa Bay. Unlimited plans starting at $25/month.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/assets/cropped-favicon-192x192.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/assets/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/assets/logo.webp',
        sizes: 'any',
        type: 'image/webp',
      },
    ],
  }
}
