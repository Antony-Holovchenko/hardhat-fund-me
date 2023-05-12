<a name="readme-top"></a>
<h3 align="center">Hardhat Fund Me</h3>

  <p align="center">
    A sample Web3 Smart Contract/Blockchain project
  </p>



<!-- TABLE OF CONTENTS -->
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quickstart](#quickstart)
- [Usage](#usage)
  - [Testing](#testing)
    - [Test Coverage](#test-coverage)
- [Deployment to a testnet or mainnet](#deployment-to-a-testnet-or-mainnet)
  - [Scripts](#scripts)
  - [Estimate gas](#estimate-gas)
    - [Estimate gas cost in USD](#estimate-gas-cost-in-usd)
  - [Verify on etherscan](#verify-on-etherscan)
- [Contacts](#contacts)


<!-- ABOUT THE PROJECT -->
# About The Project

This project demonstrates an advance Hardhat use case with a variety of integrated tools.

The project comes with a sample contract, a test for this contract and a sample script 
that deploys that contract. It also comes with a variety of other tools, preconfigured 
to work with the project code.

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- GETTING STARTED -->
# Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run 
    - `git --version` and you see a response like `git version x.x.x`
- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node -v` and get an ouput like: `vx.x.x`
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 
  - You'll know you've installed npm right if you can run:
    - `npm -v` and get an output like: `x.x.x`

## Quickstart
1. Clone the repo
   ```sh
   git clone https://github.com/Antony-Holovchenko/hardhat-fund-me.git
   ```
2. Go to the correct directory
   ```sh
   cd hardhat-fund-me-fcc
   ```
4. Install NPM packages
   ```sh
   npm install
   ```

<p align="right"><a href="#readme-top">back to top</a></p>



<!-- USAGE EXAMPLES -->
# Usage
Deploy:

```
npx hardhat deploy
```

## Testing

```
npx hardhat test
```

### Test Coverage

```
npx hardhat coverage
```


<p align="right"><a href="#readme-top">back to top</a></p>

# Deployment to a testnet or mainnet

1. Setup environment variables

You'll want to set your `GOERLY_RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file.

- `PRIVATE_KEY`: The private key of your account (like from [metamask](https://metamask.io/)). **NOTE:** FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
  - You can [learn how to export it here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- `GOERLY_RPC_URL`: This is url of the goerly testnet node you're working with. You can get setup with one for free from [Alchemy](https://alchemy.com/?a=673c802981)

2. Get testnet ETH

Below are the links where you can get some tesnet ETH. You should see the ETH show up in your metamask.
- https://goerlifaucet.com/
- https://faucet.quicknode.com/ethereum/goerli


3. Deploy

```
npx hardhat deploy --network goerly
```

<p align="right"><a href="#readme-top">back to top</a></p>

## Scripts

After deploy to a testnet or local net, you can run the scripts. 

```
npx hardhat run scripts/fund.js
```

or
```
npx hardhat run scripts/withdraw.js
```

## Estimate gas

You can estimate how much gas things cost by running:

```
yarn hardhat test
```

And you'll see and output file called `gas-report.txt`

### Estimate gas cost in USD

To get a USD estimation of gas cost, you'll need a `COINMARKETCAP_API_KEY` environment variable. You can get one for free from [CoinMarketCap](https://pro.coinmarketcap.com/signup). 

Then, uncomment the line `coinmarketcap: COINMARKETCAP_API_KEY,` in `hardhat.config.js` to get the USD estimation. Just note, everytime you run your tests it will use an API call, so it might make sense to have using coinmarketcap disabled until you need it. You can disable it by just commenting the line back out. 


## Verify on etherscan

If you deploy to a testnet or mainnet, you can verify it if you get an [API Key](https://etherscan.io/myapikey) from Etherscan and set it as an environemnt variable named `ETHERSCAN_API_KEY`. You can pop it into your `.env` file.

In it's current state, if you have your api key set, it will auto verify sepolia contracts!

However, you can manual verify with:

```
npx hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
```

<!-- CONTACT -->
## Contacts

- [LinkedIn](https://www.linkedin.com/in/anton-holovchenko-3221321a5/)

- [Project repository](https://github.com/Antony-Holovchenko/hardhat-fund-me)

- [Telegram](https://t.me/an_TON_h)


<p align="right"><a href="#readme-top">back to top</a></p>
