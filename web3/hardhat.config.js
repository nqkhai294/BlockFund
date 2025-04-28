/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'sepolia',
    networks: {
      hardhat: {},
      sepolia: {
        url: `https://11155111.rpc.thirdweb.com/${process.env.THIRDWEB_SECRET_KEY}`,
        accounts: [`0x${process.env.THIRDWEB_ADMIN_PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
