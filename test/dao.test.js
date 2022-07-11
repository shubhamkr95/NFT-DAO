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
 // let tokenID;
 // let delegateTxn;
 let proposalRole;
 let grantProposalRole;

 beforeEach(async () => {
  [sender, address1, address2, address3, address4] = await ethers.getSigners();

  // GovernToken
  GovernToken = await ethers.getContractFactory("GovernToken");
  governToken = await GovernToken.deploy();
  await governToken.deployed();

  //Timelock
  TimeLock = await ethers.getContractFactory("TimeLock");
  timelock = await TimeLock.deploy(0, [], ["0x0000000000000000000000000000000000000000"]);
  await timelock.deployed();

  // Governor
  GovernorContract = await ethers.getContractFactory("Governance");
  governorContract = await GovernorContract.deploy(
   governToken.address,
   timelock.address,
   0, //voting delay -0 block delay
   14, //voting period - 3 minute
   1, //proposal threshold - 1 NFT
   4 //quorum percentage
  );
  await governorContract.deployed();

  // Treasury contract
  Treasury = await ethers.getContractFactory("Treasury");
  treasury = await Treasury.deploy();
  await treasury.deployed();

  // send 5 ether to treasury
  const txn = await sender.sendTransaction({
   to: treasury.address,
   value: ethers.utils.parseEther("5.0"),
  });
  await txn.wait();

  await treasury.transferOwnership(timelock.address);

  // mint nft to user
  await governToken.safeMint(address1.address, "ipfs://bafybeibfhnw4uspjj2akxzkbeia4fxv37gkyvvs2skja5tomlcv3soo2hm/");
  await governToken.safeMint(address2.address, "https://ipfs.io/ipfs/QmW3FgNGeD46kHEryFUw1ftEUqRw254WkKxYeKaouz7DJA");
  await governToken.safeMint(address3.address, "http://ipfs.pics/ipfs/Qmep61aZqJhhmSkhQHUSUme5RFbi8ZfccxXC1TyjKHcEig");
  await governToken.safeMint(address4.address, "http://ipfs.pics/ipfs/QmXr1iejP2zHptFFDr3hycZvbaXaQNwrK6VVXYbxFAYQ7x");

  // delegate the user
  await governToken.connect(address1).delegate(address1.address);
  await governToken.connect(address2).delegate(address2.address);
 });

 it("Should grant the proposal role", async () => {
  proposalRole = await timelock.PROPOSER_ROLE();
  grantProposalRole = await timelock.grantRole(proposalRole, governorContract.address);

  expect(await timelock.hasRole(proposalRole, governorContract.address)).to.equal(true);
 });

 it("should transfer treasury ownership to timelock", async () => {
  expect(await treasury.owner()).to.equal(timelock.address);

  expect(await treasury.balance()).to.equal(ethers.utils.parseEther("5"));
 });
});
