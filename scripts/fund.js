const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
   const { deployer } = await getNamedAccounts() //we are telling by {} around the deployer, to extract only the deployer property and store it in the deployer variable.
   const fundMe = await ethers.getContract("FundMe", deployer)
   console.log("Funding Contract ...")
   const transactionResponse = await fundMe.fund({
      value: ethers.utils.parseEther("0.030"),
   })
   await transactionResponse.wait(1)
   console.log("Funded!")
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error)
      process.exit(1)
   })
