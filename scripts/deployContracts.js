const { ethers } = require("hardhat");

async function main() {
 const [deployer] = await ethers.getSigners();

 console.log("Deploying Govern token contract with the account:", deployer.address);

 // Deploying token
 const GovernToken = await ethers.getContractFactory("GovernToken");
 const governToken = await GovernToken.deploy();
 await governToken.deployed();

 console.log(`GovernToken address ${governToken.address}`);

 //Deploying TimeLock
 const TimeLock = await ethers.getContractFactory("TimeLock");
 const timeLock = await TimeLock.deploy();
 await timeLock.deployed();

 console.log(`Timelock address ${timeLock.address}`);
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
