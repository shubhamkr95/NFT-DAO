const { ethers } = require("hardhat");
const { GOVERNOR_ADDRESS, PROPOSAL_ID } = require("./address.js");

async function main() {
 [owner, proposer, vote1, executor] = await ethers.getSigners();

 // Get The governor address
 const Governance = await ethers.getContractFactory("Governance");
 const governance = await Governance.attach(GOVERNOR_ADDRESS);

 await governance.connect(proposer).castVote(PROPOSAL_ID, 1);
 await governance.connect(vote1).castVote(PROPOSAL_ID, 1);

 // Check proposal state before voting. 1
 console.log("Proposal state before voting: ", await governance.state(PROPOSAL_ID));
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
