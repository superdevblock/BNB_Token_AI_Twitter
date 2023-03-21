require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@openzeppelin/hardhat-upgrades");

// const { privatekey } = require('./.env.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  
  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.7.5",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
    ],
  },
  networks: {
    mainnet: {
      url: process.env.MAINNET_URL || "",
      accounts: {mnemonic: process.env.MNEMONIC,}
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: {mnemonic: process.env.MNEMONIC,}
    },
    // rinkeby: {
    //   url: process.env.RINKEBY_URL || "",
    //   accounts: {mnemonic: process.env.MNEMONIC,}
    // },
    localhost: {
      url: "http://127.0.0.1:8545"
    },

    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 30000000000,
      // accounts: {privatekey: privatekey},
      accounts: {mnemonic: process.env.MNEMONIC,}
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 30000000000,
      accounts: {mnemonic: process.env.MNEMONIC,}
    },

    ftmTestnet: {
      url: "https://rpc.testnet.fantom.network/",
      chainId: 4002,
      // gasPrice: 30000000000,
      live: false,
      saveDeployments: true,
      gasMultiplier: 2,
      // accounts: {privatekey: privatekey},
      accounts: {mnemonic: process.env.MNEMONIC,}
    },
    opera: {
      url: "https://rpcapi.fantom.network/",
      chainId: 250,
      // gasPrice: 30000000000,
      live: false,
      saveDeployments: true,
      gasMultiplier: 2,
      // accounts: {privatekey: privatekey},
      accounts: {mnemonic: process.env.MNEMONIC,}
    },

    oasisTestnet: {
      url: "https://testnet.emerald.oasis.dev/",
      chainId: 42261,
      gasPrice: 30000000000,
      accounts: {mnemonic: process.env.MNEMONIC,}
    },

    oasisMainnet: {
      url: "https://emerald.oasis.dev/",
      chainId: 42262,
      gasPrice: 30000000000,
      accounts: {mnemonic: process.env.MNEMONIC,}
    },

    avalancheMainnet: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      gasPrice: 30000000000,
      accounts: {mnemonic: process.env.MNEMONIC,}
    },

    avalancheFujiTestnet: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      gasPrice: 30000000000,
      accounts: {mnemonic: process.env.MNEMONIC,}
    },
    
    rinkeby: {
      url: process.env.RINKEBY_URL,
      gasPrice: 225000000000,
      chainId: 4,
      accounts: { mnemonic: process.env.MNEMONIC },
    },

    Goerli: {
      url: process.env.GOERLI_URL,
      gasPrice: 225000000000,
      chainId: 5,
      accounts: { mnemonic: process.env.MNEMONIC }
    },

    ConfluxESpace: {
      url: "https://evm.confluxrpc.com",
      chainId: 1030,
      gasPrice: 30000000000,
      accounts: {mnemonic: process.env.MNEMONIC,}
    },

    ConfluxESpaceTestnet: {
      url: "https://evmtestnet.confluxrpc.com",
      chainId: 71,
      gasPrice: 30000000000,
      accounts: {mnemonic: process.env.MNEMONIC,}
    },

    Polygon: {
      url: "https://polygon.llamarpc.com",
      chainId: 137,
      gasPrice: 60000000000,
      accounts: {mnemonic: process.env.MNEMONIC,}
    },

    MumbaiTestnet: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      gasPrice: 30000000000,
      accounts: {mnemonic: process.env.MNEMONIC,}
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.FUJI_API_KEY
    // {
    //   mainnet: process.env.ETHERSCAN_API_KEY,
    //   rinkeby: process.env.ETHERSCAN_API_KEY,
    //   ropsten: process.env.ETHERSCAN_API_KEY,
    //   bsc: process.env.BSCSCAN_API_KEY,
    //   bscTestnet: process.env.BSCSCAN_API_KEY,
    //   ftmTestnet: process.env.FTMSCAN_API_KEY,
    //   avalancheFujiTestnet: process.env.FUJI_API_KEY,
    //   Polygon: process.env.POLYSCAN_API_KEY,
    //   MumbaiTestnet: process.env.POLYSCAN_API_KEY,
    // },
  },
  plugins: ['@openzeppelin/hardhat-upgrades', '@nomiclabs/hardhat-etherscan']
};




    