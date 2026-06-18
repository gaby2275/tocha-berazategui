import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rocha Berazategui',
    short_name: 'Rocha',
    description:
      'Distribuidora mayorista de alimentos para pizzerías, hamburgueserías, bares, rotiserías y negocios gastronómicos.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#081120',
    theme_color: '#081120',
    orientation: 'portrait',
    lang: 'es-AR',
    categories: ['shopping', 'business', 'food'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
    // Optimizado para iPhone 13+
    prefer_related_applications: false,
    display_override: ['standalone', 'fullscreen'],
  };
}

// Made with Bob
