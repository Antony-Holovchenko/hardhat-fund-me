const { ethers, getNamedAccounts } = require("hardhat")
async function main() {
   const { deployer } = await getNamedAccounts() //we are telling by {} around the deployer, to extract only the deployer property and store it in the deployer variable.
   const fundMe = await ethers.getContract("FundMe", deployer)
   console.log("Withdrawing from contract...")
   const transactionResponse = await fundMe.withdraw()
   await transactionResponse.wait(1)
   console.log("Got it back!")
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error)
      process.exit(1)
   })
