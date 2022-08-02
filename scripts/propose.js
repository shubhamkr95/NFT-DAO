const { ethers } = require("hardhat");
const { GOVERNOR_ADDRESS, TREASURY_ADDRESS } = require("./address");

async function main() {
 const [owner] = await ethers.getSigners();

 // Get The governor address
 const Governance = await ethers.getContractFactory("Governance");
 const governance = await Governance.attach(GOVERNOR_ADDRESS);

 // Get the treasury address
 const Treasury = await ethers.getContractFactory("Treasury");
 const treasury = await Treasury.attach(TREASURY_ADDRESS);

 const proposalTxn = await governance.propose(
  [TREASURY_ADDRESS],
  [0],
  [await treasury.interface.encodeFunctionData("withdrawFunds", [owner.address, ethers.utils.parseUnits("1", 18)])],
  "Sending 1 ether to owner address!"
 );
 const txn = await proposalTxn.wait();

 // Get the proposalId from the events emitted.
 const proposalId = txn.events[0].args.proposalId;
 console.log(" Created a proposal to send 1 ether to owner with id: ", proposalId);
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
