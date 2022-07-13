const { ethers } = require("hardhat");

async function main() {
 const [deployer] = await ethers.getSigners();

 console.log("Deploying Govern token contract with the account:", deployer.address);

 // Deploying token
 const GovernToken = await ethers.getContractFactory("GovernToken");
 const governToken = await GovernToken.deploy();
 await governToken.deployed();
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
