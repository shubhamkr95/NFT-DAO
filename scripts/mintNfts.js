const { ethers } = require("hardhat");
const { ERC721_TOKEN_ADDRESS } = require("./address");

async function main() {
 const [owner, proposer, vote1] = await ethers.getSigners();

 const GovernToken = await ethers.getContractFactory("GovernToken");
 const governToken = await GovernToken.attach(ERC721_TOKEN_ADDRESS);

 // minting nft to the accounts
 await governToken.safeMint(owner.address, "ipfs://https://ipfs.io/ipfs/Qmduj4VjKMMWRLwxcrHugxCTWD1cZ66iiKTeW2JGRZtY9u/");
 await governToken.safeMint(proposer.address, "https://ipfs.io/ipfs/QmW3FgNGeD46kHEryFUw1ftEUqRw254WkKxYeKaouz7DJA");
 await governToken.safeMint(vote1.address, "https://cloudflare-ipfs.com/ipfs/Qmep61aZqJhhmSkhQHUSUme5RFbi8ZfccxXC1TyjKHcEig");

 console.log(`Minting ERC721 tokens`);

 await governToken.connect(owner).delegate(owner.address);
 await governToken.connect(proposer).delegate(proposer.address);
 await governToken.connect(vote1).delegate(vote1.address);

 console.log(`Delegated ERC 721 tokens`);
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
