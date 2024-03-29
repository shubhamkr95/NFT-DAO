const { ethers } = require("hardhat");

async function main() {
 const [owner, proposer, vote1, executor] = await ethers.getSigners();
 console.log(`Deploying Govern token contract with the account: ${owner.address} \n`);

 // Deploying token
 const GovernToken = await ethers.getContractFactory("GovernToken");
 const governToken = await GovernToken.deploy();
 await governToken.deployed();

 console.log(`GovernToken address ${governToken.address} \n`);

 //Deploying TimeLock
 const TimeLock = await ethers.getContractFactory("TimeLock");
 const timeLock = await TimeLock.deploy(
  0 /*seconds*/,
  [] /*Proposers addresses*/,
  ["0x0000000000000000000000000000000000000000"] /*Executer address*/
 );
 await timeLock.deployed();

 console.log(`Timelock address ${timeLock.address} \n`);

 // Deploying Governor
 const GovernorContract = await ethers.getContractFactory("Governance");
 const governorContract = await GovernorContract.deploy(
  governToken.address,
  timeLock.address,
  1, //voting delay - 1 block delay
  20, //voting period - 3 minute
  1, //proposal threshold - 1 NFT
  4 //quorum percentage - 4 percent
 );
 await governorContract.deployed();

 console.log(`Governor address ${governorContract.address} \n`);

 // Deploying Treasury
 Treasury = await ethers.getContractFactory("Treasury");
 treasury = await Treasury.deploy();
 await treasury.deployed();

 console.log(`Treasury address ${treasury.address} \n`);

 // transfer proposal role to the governor address
 const proposalRole = await timeLock.PROPOSER_ROLE();
 const grantRoleTxn = await timeLock.grantRole(proposalRole, governorContract.address);
 console.log(`grant role to govern transaction hash ${grantRoleTxn.hash} \n`);

 // revoke owner admin role from timelock
 const timeLockAdminRole = await timeLock.TIMELOCK_ADMIN_ROLE();
 await timeLock.revokeRole(timeLockAdminRole, owner.address);

 //transfer ownership of treasury to timelock address
 await treasury.transferOwnership(timeLock.address);
 console.log(`New Treasury owner is ${await treasury.owner()} \n`);

 // send ethers to treasury contract
 const txn = await owner.sendTransaction({
  to: treasury.address,
  value: ethers.utils.parseEther("1"),
 });
 await txn.wait();
 console.log(`Send 1 Rinkeby to treasury address`);
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
