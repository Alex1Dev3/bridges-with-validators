// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IToken {
    function mint(address sender, uint256 tokenId) external;
    function transfer(address receiver, uint256 tokenId) external;
    function transferFrom(address sender, address receiver, uint256 tokenId) external;
}