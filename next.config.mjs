import withPWA from "next-pwa"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "43b5dgi6x7.ufs.sh",
      },
    ],
  },
  eslint: {
    // Aviso: Isso permite que você publique código com erros de ESLint.
    // É útil se você quer fazer o build sem ser bloqueado pelas regras de lint.
    ignoreDuringBuilds: true,
  },
}

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig)
