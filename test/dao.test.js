const { expect } = require("chai");
const { ethers } = require("hardhat");
const { mineBlocks } = require("../utils/mineBlock");

describe("Govern", async () => {
 let Treasury;
 let treasury;
 let GovernToken;
 let governToken;
 let TimeLock;
 let timelock;
 let GovernorContract;
 let governorContract;
 let proposalID;

 beforeEach(async () => {
  [vote1, vote2, vote3, vote4] = await ethers.getSigners();

  // Treasury contract
  Treasury = await ethers.getContractFactory("Treasury");
  treasury = await Treasury.deploy();
  await treasury.deployed();

  // GovernToken
  GovernToken = await ethers.getContractFactory("GovernToken");
  governToken = await GovernToken.deploy(treasury.address);
  await governToken.deployed();

  //Timelock
  TimeLock = await ethers.getContractFactory("TimeLock");
  timelock = await TimeLock.deploy(0, [], ["0x0000000000000000000000000000000000000000"]);
  await timelock.deployed();

  // Governor
  GovernorContract = await ethers.getContractFactory("Governance");
  governorContract = await GovernorContract.deploy(governToken.address, timelock.address);
  await governorContract.deployed();

  await treasury.transferOwnership(timelock.address);
 });
});
