// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";

contract Treasury is Ownable {
    receive() external payable {}

    function balance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdrawFunds(address to, uint256 amount) public onlyOwner {
        require(
            amount <= address(this).balance,
            "This wallet does not have enough balance to send"
        );

        (bool sent, ) = payable(to).call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}
