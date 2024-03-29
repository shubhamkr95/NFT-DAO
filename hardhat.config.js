require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-contract-sizer");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
 const accounts = await hre.ethers.getSigners();

 for (const account of accounts) {
  console.log(account.address);
 }
});

const { RINKEBY_API_URL, RINKEBY_PRIVATE_KEY, ETHERSCAN_KEY } = process.env;

module.exports = {
 gasReporter: {
  currency: "ETH",
  gasPrice: 21,
 },
 solidity: {
  version: "0.8.4",
  settings: {
   optimizer: {
    enabled: true,
    runs: 200,
   },
  },
 },
 defaultNetwork: "hardhat",
 networks: {
  hardhat: {},
  rinkeby: {
   url: RINKEBY_API_URL,
   accounts: {
    mnemonic: RINKEBY_PRIVATE_KEY,
   },
  },
 },
 etherscan: {
  apiKey: ETHERSCAN_KEY,
 },
 contractSizer: {
  alphaSort: true,
  runOnCompile: true,
  disambiguatePaths: false,
 },

 plugins: ["solidity-coverage"],
};
