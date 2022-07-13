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
 const timeLock = await TimeLock.deploy(
  0 /*seconds*/,
  [] /*Proposers addresses*/,
  ["0x0000000000000000000000000000000000000000"] /*Executer address*/
 );
 await timeLock.deployed();

 console.log(`Timelock address ${timeLock.address}`);

 // Deploying Governor
 const GovernorContract = await ethers.getContractFactory("Governance");
 const governorContract = await GovernorContract.deploy(
  governToken.address,
  timeLock.address,
  0, //voting delay -0 block delay
  14, //voting period - 3 minute
  1, //proposal threshold - 1 NFT
  4 //quorum percentage
 );
 await governorContract.deployed();

 console.log(`Governor address ${governorContract.address}`);
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
