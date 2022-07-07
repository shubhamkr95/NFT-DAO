require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("solidity-coverage");

module.exports = {
 solidity: "0.8.4",
 settings: {
  optimizer: {
   enabled: true,
   runs: 200,
  },
 },
 plugins: ["solidity-coverage"],
};
