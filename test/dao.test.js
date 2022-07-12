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
 let proposalRole;
 let grantProposalRole;

 beforeEach(async () => {
  [address1, address2, address3, address4, sender, receiver, voteReceiver] = await ethers.getSigners();

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
  await governToken.connect(address3).delegate(address3.address);
  await governToken.connect(address4).delegate(address4.address);
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

 it("Generate the proposal ID", async () => {
  proposalRole = await timelock.PROPOSER_ROLE();
  grantProposalRole = await timelock.grantRole(proposalRole, governorContract.address);

  const txn = await governorContract.propose(
   [treasury.address],
   [0],
   [treasury.interface.encodeFunctionData("withdrawFunds", [receiver.address, ethers.utils.parseEther("3", "ether")])],
   "Send-Ethers"
  );

  const txnWait = await txn.wait();
  proposalID = txnWait.events[0].args.proposalId.toString();
  await mineBlocks(1); //mine 1 block

  expect(await governorContract.state(proposalID)).to.equal(1);
 });

 it("Vote for then queue the proposal and execute", async () => {
  proposalRole = await timelock.PROPOSER_ROLE();
  grantProposalRole = await timelock.grantRole(proposalRole, governorContract.address);

  const txn = await governorContract.propose(
   [treasury.address],
   [0],
   [treasury.interface.encodeFunctionData("withdrawFunds", [receiver.address, ethers.utils.parseEther("3", "ether")])],
   "Send-Ethers"
  );

  const txnWait = await txn.wait();
  proposalID = txnWait.events[0].args.proposalId.toString();
  await mineBlocks(1); //mine 1 block

  await governorContract.connect(address1).castVote(proposalID, 1);
  await governorContract.connect(address2).castVote(proposalID, 1);
  await governorContract.connect(address3).castVote(proposalID, 1);
  await governorContract.connect(address4).castVote(proposalID, 1);

  await mineBlocks(10);
  expect(await governorContract.state(proposalID)).to.equal(4);

  await governorContract.queue(
   [treasury.address],
   [0],
   [treasury.interface.encodeFunctionData("withdrawFunds", [receiver.address, ethers.utils.parseEther("3", "ether")])],
   ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Send-Ethers"))
  );

  expect(await governorContract.state(proposalID)).to.equal(5);

  await governorContract.execute(
   [treasury.address],
   [0],
   [treasury.interface.encodeFunctionData("withdrawFunds", [receiver.address, ethers.utils.parseEther("3", "ether")])],
   ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Send-Ethers"))
  );

  expect(await governorContract.state(proposalID)).to.equal(7);

  expect(await treasury.balance()).to.equal(ethers.utils.parseEther("2", "ether"));
 });

 it("Vote against the proposal", async () => {
  proposalRole = await timelock.PROPOSER_ROLE();
  grantProposalRole = await timelock.grantRole(proposalRole, governorContract.address);

  const txn = await governorContract.propose(
   [treasury.address],
   [0],
   [treasury.interface.encodeFunctionData("withdrawFunds", [receiver.address, ethers.utils.parseEther("3", "ether")])],
   "Send-Ethers"
  );

  const txnWait = await txn.wait();
  proposalID = txnWait.events[0].args.proposalId.toString();
  await mineBlocks(1); //mine 1 block

  await governorContract.connect(address1).castVote(proposalID, 0);
  await governorContract.connect(address2).castVote(proposalID, 0);
  await governorContract.connect(address3).castVote(proposalID, 0);
  await governorContract.connect(address4).castVote(proposalID, 0);

  await mineBlocks(10);
  expect(await governorContract.state(proposalID)).to.equal(3);

  await expect(
   governorContract.queue(
    [treasury.address],
    [0],
    [treasury.interface.encodeFunctionData("withdrawFunds", [receiver.address, ethers.utils.parseEther("3", "ether")])],
    ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Send-Ethers"))
   )
  ).to.be.reverted;

  expect(
   governorContract.execute(
    [treasury.address],
    [0],
    [treasury.interface.encodeFunctionData("withdrawFunds", [receiver.address, ethers.utils.parseEther("3", "ether")])],
    ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Send-Ethers"))
   )
  ).to.be.reverted;
 });

 it("cannot change casted vote", async () => {
  proposalRole = await timelock.PROPOSER_ROLE();
  grantProposalRole = await timelock.grantRole(proposalRole, governorContract.address);

  const txn = await governorContract.propose(
   [treasury.address],
   [0],
   [treasury.interface.encodeFunctionData("withdrawFunds", [receiver.address, ethers.utils.parseEther("3", "ether")])],
   "Send-Ethers"
  );

  const txnWait = await txn.wait();
  proposalID = txnWait.events[0].args.proposalId.toString();
  await mineBlocks(1); //mine 1 block

  await governorContract.connect(address1).castVote(proposalID, 1);
  const tokedIDOwner = await governToken.ownerOf(0);
  await mineBlocks(3);

  await expect(governorContract.connect(address1).castVote(proposalID, 0)).to.be.reverted;
 });
});
