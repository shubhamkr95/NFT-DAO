const { ethers } = require("hardhat");
const { GOVERNOR_ADDRESS, TREASURY_ADDRESS, PROPOSAL_ID } = require("./address.js");

async function main() {
 const [owner] = await ethers.getSigners();

 // Get The governor address
 const Governance = await ethers.getContractFactory("Governance");
 const governance = await Governance.attach(GOVERNOR_ADDRESS);

 // Get the treasury address
 const Treasury = await ethers.getContractFactory("Treasury");
 const treasury = await Treasury.attach(TREASURY_ADDRESS);

 // check the state of the proposal before queue
 console.log("Proposal state before execute: ", await governance.state(PROPOSAL_ID));

 // Now, queue the proposal.
 const queueTxn = await governance.execute(
  [TREASURY_ADDRESS],
  [0],
  [await treasury.interface.encodeFunctionData("withdrawFunds", [owner.address, ethers.utils.parseUnits("1", 18)])],
  ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Sending 1 ether to owner address!"))
 );

 await queueTxn.wait();
 console.log("Execute the proposal!");
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
