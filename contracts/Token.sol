// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract Token is ERC721 {

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(address _sender, uint _tokenId)
    public
    {
        _mint(_sender, _tokenId);
    }

    function transfer(address _receiver, uint256 _tokenId)
    public
    {
        _transfer(msg.sender, _receiver, _tokenId);
    }
}