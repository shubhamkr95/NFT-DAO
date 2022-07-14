# ERC721 ON-CHAIN-DAO

- ### A on-chain DAO with ERC 721 voting mechanism

## Contracts:

1. ### GovernToken.sol

   - Token type: ERC-721
   - Token name: GovernToken
   - Token symbol: GTK
   - Users can delegate their voting power to themselves or others in order to create a snapshot of their voting power
   - Each token gives 1 voting power
   - Only owner can mint token to the required address

2. ### TimeLock.sol

   - This the the owner of the treasury contract
   - After completion of minimum delay the successful proposal is being executed
   - Any one can execute the the passed proposal

3. ### Governance.sol

   - This contracts creates a DAO ecosystem in which users which holds a minimum of 1 ERC 721 token can create a proposal
   - Users can vote in favour or against the proposal and can also abstain their vote
   - Minimum of 4 percent voting participate required
   - A proposal is passed through the various stages

   ```
      Number          Stage

      0               Pending
      1               Active
      2               Canceled
      3               Defeated
      4               Succeeded
      5               Queued
      6               Expired
      7               Executed
   ```

4. ### Treasury.sol

   - Anyone can donate their Ether in this contract
   - After Governance DAO ecosystem pass the proposal then the required amount will be transferred to the provided address

## Testing

```
git clone https://github.com/shubhamkr95/NFT-DAO.git

cd NFT_DAO

npm install

npx hardhat compile

npx hardhat test

npx hardhat coverage

```
