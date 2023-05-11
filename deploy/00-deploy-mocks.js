const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_PRICE,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const networkName = network.name // our names are localhost + hardhat in helper file

    // The statement above checks, if we are in a localhost || hardhat network -> only then deploy mocks
    if (developmentChains.includes(networkName)) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })
        log("Mocks deployed!")
        log("----------------------------------------------------")
        log(
            "You are deploying to a local network, you'll need a local network running to interact"
        )
    }
}

module.exports.tags = ["all", "mocks"]
