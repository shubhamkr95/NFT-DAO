require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-contract-sizer");

module.exports = {
 solidity: {
  version: "0.8.4",
  settings: {
   optimizer: {
    enabled: true,
    runs: 200,
   },
  },
 },
 contractSizer: {
  alphaSort: true,
  runOnCompile: true,
  disambiguatePaths: false,
 },
 paths: {
  sources: "./contracts",
  tests: "./test",
  cache: "./cache",
  artifacts: "./artifacts",
 },
 plugins: ["solidity-coverage"],
};
