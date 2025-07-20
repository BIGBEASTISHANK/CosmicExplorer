import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
        port: '',
        pathname: '/apod/image/**',
      },
      {
        protocol: 'https',
        hostname: 'staticmap.openstreetmap.de',
        port: '',
        pathname: '/**',
      },
      // Add these for Live Earth View
      {
        protocol: 'https',
        hostname: 'epic.gsfc.nasa.gov',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.star.nesdis.noaa.gov',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'eoimages.gsfc.nasa.gov',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
