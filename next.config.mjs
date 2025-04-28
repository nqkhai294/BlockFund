/** @type {import('next').NextConfig} */
const nextConfig = {
  // fixes wallet connect dependency issue https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    domains: [
      'ipfs.io',
      'gateway.pinata.cloud',
      'thirdwebstorage.com',
      'cloudflare-ipfs.com',
      'ipfs.infura.io',
      'ipfs.fleek.co',
      'ipfs.eth.aragon.network',
      'ipfs.thirdweb.com',
      'ipfs.thirdwebcdn.com',
      'ipfs.thirdweb.dev',
      'ipfs.thirdweb.network',
      'ipfs.thirdweb.org',
      'ipfs.thirdweb.io',
      'ipfs.thirdweb.co',
      'ipfs.thirdweb.app',
      'ipfs.thirdweb.xyz',
      'ipfs.thirdweb.link',
      'ipfs.thirdweb.store',
      'ipfs.thirdweb.cloud',
      'ipfs.thirdweb.space',
      'ipfs.thirdweb.world',
      'ipfs.thirdweb.zone',
      'ipfs.thirdweb.site',
      'ipfs.thirdweb.tech',
      'ipfs.thirdweb.team',
      'ipfs.thirdweb.group',
      'ipfs.thirdweb.club',
      'ipfs.thirdweb.fun',
      'ipfs.thirdweb.live',
      'ipfs.thirdweb.me',
      'ipfs.thirdweb.biz',
      'ipfs.thirdweb.info',
      'ipfs.thirdweb.pro',
      'ipfs.thirdweb.net'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
};

export default nextConfig;
