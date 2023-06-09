const networkConfig = {
    31337: {
        name: "localhost",
    },
    5: {
        name: "goerly",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
}

const developmentChains = ["hardhat", "localhost"]

const DECIMALS = "8"
const INITIAL_PRICE = "200000000000" // 2000

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_PRICE,
}
