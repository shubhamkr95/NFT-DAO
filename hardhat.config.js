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

const { POLYGON_API_URL, POLYGON_PRIVATE_KEY, POLYGON_SCAN_KEY } = process.env;

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
  mumbai: {
   url: POLYGON_API_URL,
   accounts: {
    mnemonic: POLYGON_PRIVATE_KEY,
   },
  },
 },
 etherscan: {
  apiKey: POLYGON_SCAN_KEY,
 },
 contractSizer: {
  alphaSort: true,
  runOnCompile: true,
  disambiguatePaths: false,
 },

 plugins: ["solidity-coverage"],
};
