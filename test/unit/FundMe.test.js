const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name) //Сheck if the current network is included in the 'developmentChains' array.
   ? describe.skip // If no we will skip the whole test suite
   : describe("FundMe", function () {
        let fundMe
        let mockV3Aggregator
        let deployer
        const sendValue = ethers.utils.parseEther("1") //parseEther converts 1 in 1 with 18 zeroes
        beforeEach(async () => {
           // const accounts = await ethers.getSigners()
           // deployer = accounts[0]
           deployer = (await getNamedAccounts()).deployer
           console.log(`Your deployer is: ${deployer}`)
           await deployments.fixture(["all"]) // check which deployment script has an 'all' tag, and deploy this scripts
           fundMe = await ethers.getContract("FundMe", deployer) // getContact() function retrieve the most recent deployment of the contact
           mockV3Aggregator = await ethers.getContract(
              "MockV3Aggregator",
              deployer
           )
        })

        describe("Testing constructor", function () {
           it("sets the aggregator addresses correctly", async () => {
              const response = await fundMe.getPriceFeed()
              expect(response).to.equal(mockV3Aggregator.address)
           })
        })

        describe("Testing Fund function", function () {
           it("Fails if you do not send enough ETH", async () => {
              await expect(fundMe.fund()).to.be.revertedWith(
                 "You need to spend more ETH"
              ) //check id our fund function is reverted with correct err message
           })

           it("Update the amount funded data structure ", async () => {
              await fundMe.fund({ value: sendValue })
              const response = await fundMe.getAddressToAmountFunded(deployer) // we receive here a number of funded funds from our deployer
              expect(response.toString()).to.equal(sendValue.toString()) // we compare how much funds send deployer with our state variable "sendValue"
           })

           it("Adds funder to array of funders", async () => {
              await fundMe.fund({ value: sendValue })
              const funder = await fundMe.getFunder(0)
              expect(funder).to.equal(deployer)
           })
        })

        describe("Testing withdraw function", function () {
           beforeEach(async () => {
              await fundMe.fund({ value: sendValue }) // put ETH to our contract before start testing
           })

           /** @description how to work with balances/BigNumbers/withdrawing*/
           it("Withdraw ETH from a single founder", async () => {
              //Arrange - here we prepare all needed for the test
              const startingFundMeBalance = await fundMe.provider.getBalance(
                 fundMe.address
              ) //receive a contract balance
              const startingDeployerBalance = await fundMe.provider.getBalance(
                 deployer
              ) //receive a deployer balance

              //Act - do some test actions
              const transactionResponse = await fundMe.withdraw() // do a withdraw of our funds
              const transactionReceipt = await transactionResponse.wait(1)
              const { gasUsed, effectiveGasPrice } = transactionReceipt // we take the gas amount and gas price from the transactionReceipt
              const gasCost = gasUsed.mul(effectiveGasPrice) // calculate how much gas we spend by multiplying gasAmount * gasPrice
              const endingFundMeBalance = await fundMe.provider.getBalance(
                 fundMe.address
              ) //receive a contract balance after withdraw
              const endingDeployerBalance = await fundMe.provider.getBalance(
                 deployer
              ) //receive a deployer balance after withdraw

              //Assert - validate the response
              expect(endingFundMeBalance).to.equal(0) //we withdraw all funds, so it should be a 0
              expect(
                 startingFundMeBalance.add(startingDeployerBalance).toString()
              ).to.equal(endingDeployerBalance.add(gasCost).toString()) // add() func. help us to sum a bigNumbers
           })

           it("Allow to withdraw with multiple funders", async () => {
              //Arrange
              const accounts = await ethers.getSigners() //receive different accounts
              for (let i = 1; i < 6; i++) {
                 const fundMeConnectedAccount = await fundMe.connect(
                    accounts[i] //here with connect() func we define an ETH account which will interract with
                 )
                 await fundMeConnectedAccount.fund({ value: sendValue })
              }
              const startingFundMeBalance = await fundMe.provider.getBalance(
                 fundMe.address
              )
              const startingDeployerBalance = await fundMe.provider.getBalance(
                 deployer
              )

              //Act
              const transactionResponse = await fundMe.withdraw()
              const transactionReceipt = await transactionResponse.wait(1)
              const { gasUsed, effectiveGasPrice } = transactionReceipt
              const gasCost = gasUsed.mul(effectiveGasPrice)
              const endingFundMeBalance = await fundMe.provider.getBalance(
                 fundMe.address
              )
              const endingDeployerBalance = await fundMe.provider.getBalance(
                 deployer
              )

              //Assert - validate the response
              expect(endingFundMeBalance).to.equal(0) //we withdraw all funds, so it should be a 0
              expect(
                 startingFundMeBalance.add(startingDeployerBalance).toString()
              ).to.equal(endingDeployerBalance.add(gasCost).toString())

              // make sure funders are reset properly
              await expect(fundMe.getFunder(0)).to.be.reverted
              for (let i = 1; i < 6; i++) {
                 expect(
                    await fundMe.getAddressToAmountFunded(accounts[i].address)
                 ).to.equal(0)
              }
           })

           /** @description how to work with attackers/connect new account to a contract instance*/
           it("Only allows the owner to withdraw", async () => {
              const accounts = await ethers.getSigners()
              const attacker = accounts[1] //this is our random attacker
              const attackerConnectedContract = await fundMe.connect(attacker) // we create a new instance of FundMe contract which is connected to an attacker account
              await expect(
                 attackerConnectedContract.withdraw()
              ).to.be.revertedWithCustomError(fundMe, "FundMe__NotOwner") // an unauthorized user can't withdraw funds
           })
        })
     })
