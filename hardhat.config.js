require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")

const GOERLY_RPC_URL =
   process.env.GOERLY_RPC_URL ||
   "https://eth-goerli.g.alchemy.com/v2/mH9AfX-MdelmXK8FfjiBd9-wljf0V3S4"
const PRIVATE_KEY =
   process.env.PRIVATE_KEY ||
   "635ea17bbd9b8b374d5ae20cd5747f5d292d45f6f9cb8cf2eeb859beda04844d"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

module.exports = {
   solidity: {
      compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
   },
   defaultNetwork: "hardhat",
   networks: {
      hardhat: {
         chainId: 31337,
      },
      goerly: {
         url: GOERLY_RPC_URL,
         accounts: [PRIVATE_KEY],
         chainId: 5,
         blockConfirmations: 6,
      },
   },
   gasReporter: {
      enabled: true,
      outputFile: "gas-report.txt",
      noColors: true,
      currency: "USD",
      //coninmarketcap: COINMARKETCAP_API_KEY,
      token: "MATIC",
   },
   etherscan: {
      apiKey: ETHERSCAN_API_KEY,
   },
   namedAccounts: {
      deployer: {
         default: 0, // here this will by default take the first account as deployer
         1: 0,
      },
   },
}
