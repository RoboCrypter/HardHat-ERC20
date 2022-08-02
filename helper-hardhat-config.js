
const networkConfig = {

    4: {
        name: "rinkeby",
    },

    31337: {
        name: "localhost"
    }
}

const INITIAL_SUPPLY = "10000000000000000000000"


const devNetworks = ["hardhat", "localhost"]



module.exports = {
    networkConfig,
    INITIAL_SUPPLY,
    devNetworks
}