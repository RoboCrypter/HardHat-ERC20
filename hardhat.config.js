require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("hardhat-contract-sizer")
require("hardhat-deploy")
require("hardhat-gas-reporter")
require("solidity-coverage")



const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY



module.exports = {
    
    solidity: "0.8.7",

    defaultNetwork: "hardhat",

    networks: {

        localhost: {
            chainId: 31337,
         // url: localhost-url
         // accounts: [hardhat fake accounts]
        },

        rinkeby: {
            chainId: 4,
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
    },

    namedAccounts: {
        deployer: {
            default: 0
        },
        spender: {
            default: 1
        },
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },

    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        currency: "USD",
        token: "avax"
    },

    contractSizer: {
        runOnCompile: false,
        only: ["HopiumToken"]
    },

    mocha: {
        timeout: 200000
    }

}
