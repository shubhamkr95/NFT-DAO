# ERC721 ON-CHAIN-DAO

## About

- This is an on chain governance model in which anyone can create new proposal or vote using their NFT tokens. Users can get the tokens by requesting the [owner](https://rinkeby.etherscan.io/address/0x79b93177Cd2c2aC50F4DC048D44a979d67F1512d) of the [GovernToken](https://rinkeby.etherscan.io/address/0xCB48a311045B8ccBBEaBBee0F117d008F43fB6c9) contract to mint the ERC 721 token to their address and need to delegate themselves so that they can able to vote to pass or reject any proposal.
  Each ERC-721 token holds one voting power per user. User can create [proposals](https://rinkeby.etherscan.io/tx/0x9173bbf38fd551f143418001daa8dfc0b9f0a84849077aff0484c10a90078e4e) in which they can provide the amount of Ether to be send from the treasury to the receiver address which is provided by the [Governance](https://rinkeby.etherscan.io/address/0xc14118810f2251b4472b4399fe2D3092e009db91) contract only then after 1 block the voting period starts and the minimum voting participant is required to be around 4% of the total token holder. If the majority votes comes in favor then the proposal gets [queued](https://rinkeby.etherscan.io/tx/0x3292d56c2418e85ca4bf6dbe2831ad22b64b3d47a1cf2fba98a1ec3e77ed0aed) and then [executed](https://rinkeby.etherscan.io/tx/0x759151a1b828ed509e8e57add3b71e0f9aea6cc246d566fc3bff6ef8b9214199)
  after then only the [timelock](https://rinkeby.etherscan.io/address/0x131717f81350E9648BA1633EA356F8Bd1925Af9d) contract which is the owner of the treasury will execute the operation.

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run git --version and you see a response like git version x.x.x
- [NodeJS](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    node --version and get an output like: vx.x.x

## Contracts

1. ### GovernToken

- Token type: ERC-721
- Token name: GovernToken
- Token symbol: GTK
- Users can delegate their voting power to themselves or others in order to create a snapshot of their voting power
- Each token gives 1 voting power
- Only owner can mint token to the required address

2. ### TimeLock

   - This the the owner of the treasury contract
   - After completion of minimum delay the successful proposal is being executed
   - Any one can execute the the passed proposal

3. ### Governance

   - This contracts creates a DAO ecosystem in which users which holds a minimum of 1 ERC 721 token can create a proposal
   - Users can vote in favour or against the proposal and can also abstain their vote

     ```
      Choice         Meaning

        0           Against the proposal
        1           In favor of the proposal
        2           Abstain
     ```

   - Minimum of 4 percent voting participate required
   - A proposal is passed through the various stages

     ```
      Number         Stage

        0           Pending
        1           Active
        2           Canceled
        3           Defeated
        4           Succeeded
        5           Queued
        6           Expired
        7           Executed
     ```

4. ### Treasury

   - Anyone can donate their Ether in this contract
   - After Governance DAO ecosystem pass the proposal then the required amount will be transferred to the provided address

## Testing

```
git clone https://github.com/shubhamkr95/NFT-DAO.git

cd NFT-DAO

npm install

npx hardhat compile

npx hardhat test

npx hardhat coverage

```

## Code style

```
npm run prettier:solidity
```

## License

Distributed under the MIT License.

## Deployed address

GovernToken address: [0xCB48a311045B8ccBBEaBBee0F117d008F43fB6c9](https://rinkeby.etherscan.io/address/0xCB48a311045B8ccBBEaBBee0F117d008F43fB6c9)

Timelock address: [0x131717f81350E9648BA1633EA356F8Bd1925Af9d](https://rinkeby.etherscan.io/address/0x131717f81350E9648BA1633EA356F8Bd1925Af9d)

Governor address: [0xc14118810f2251b4472b4399fe2D3092e009db91](https://rinkeby.etherscan.io/address/0xc14118810f2251b4472b4399fe2D3092e009db91)

Treasury address: [0xF9C0722047CD51e82EC59856BD86ad869FF6f4f6](https://rinkeby.etherscan.io/address/0xF9C0722047CD51e82EC59856BD86ad869FF6f4f6)
