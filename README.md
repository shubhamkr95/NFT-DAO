# ERC721 ON-CHAIN-DAO

## About

- This is an on chain governance model in which anyone can create new proposal or vote using their NFT tokens. Users can get the tokens by requesting the [owner](https://mumbai.polygonscan.com/address/0xa7f3c0D12481957A6FAc82cC4EC31f0f9f12843B) of the [GovernToken](https://mumbai.polygonscan.com/address/0x2ffda8135ae1fc22b84ec6f8d185d8f3dfc9a352) contract to mint the ERC 721 token to their address and need to delegate themselves so that they can able to vote to pass or reject any proposal.
  Each ERC-721 token holds one voting power per user. User can create [proposals](https://mumbai.polygonscan.com/tx/0xeae0c5becc6e12701670a9144099a81170516829233031fd310ef313a7d183a9) in which they can provide the amount of Ether to be send from the treasury to the receiver address which is provided by the [Governance](https://mumbai.polygonscan.com/tx/0xeae0c5becc6e12701670a9144099a81170516829233031fd310ef313a7d183a9) contract only then after 1 block the voting period starts and the minimum voting participant is required to be around 4% of the total token holder. If the majority votes comes in favor then the proposal gets [queued](https://mumbai.polygonscan.com/tx/0xd1b19e844802bc62c229d55f049456bdc6f92a1f0d7e53852b73c8a81ab11541) and then [executed](https://mumbai.polygonscan.com/tx/0xa8f7cec847c9e538aa8fb3a5d9039b3c50deeee76ae0fc9a21835c4168095180)
  by the [timelock](https://mumbai.polygonscan.com/address/0x15B6002738550e08a1896CF7ac99694031BF0dC8) contract which is the owner of the treasury.

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

GovernToken address: [0x2fFda8135aE1fc22b84EC6F8d185D8F3dFC9a352](https://mumbai.polygonscan.com/address/0x2fFda8135aE1fc22b84EC6F8d185D8F3dFC9a352)

Timelock address: [0x15B6002738550e08a1896CF7ac99694031BF0dC8](https://mumbai.polygonscan.com/address/0x15B6002738550e08a1896CF7ac99694031BF0dC8)

Governor address: [0xb38D990Ac50E51435f155FE263DBdC0B746F206F](https://mumbai.polygonscan.com/address/0xb38D990Ac50E51435f155FE263DBdC0B746F206F)

Treasury address: [0x637F221a5E31b13446B027462E543245C3531090](https://mumbai.polygonscan.com/address/0x637F221a5E31b13446B027462E543245C3531090)
