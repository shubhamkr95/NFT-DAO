// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.0/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts@4.7.0/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts@4.7.0/utils/Counters.sol";

contract GovernToken is ERC721, EIP712, ERC721Votes {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    address payable vault;

    constructor(address payable _vault)
        ERC721("GovernToken", "GTK")
        EIP712("GovernToken", "1")
    {
        vault = _vault;
    }

    function safeMint(address to) public payable {
        require(msg.value >= 1 ether, "1 ether required to mint");
        vault.transfer(address(this).balance);

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Votes) {
        super._afterTokenTransfer(from, to, tokenId);
    }
}
