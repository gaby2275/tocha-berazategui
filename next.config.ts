import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para exportación estática (requerido por Capacitor iOS)
  output: 'export',
  
  // Deshabilitar optimización de imágenes para exportación estática
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  
  // Agregar trailing slash para mejor compatibilidad con iOS
  trailingSlash: true,
  
  // Deshabilitar generación de sitemap automático
  distDir: 'out',
};

export default nextConfig;
