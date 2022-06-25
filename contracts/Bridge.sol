// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import './IToken.sol';

contract Bridge is Ownable {
    IToken public token;

    uint256 nonce;
    mapping(uint => bool) public nonces;
    mapping(address => bool) validators;

    event Init(
        address sender,
        uint256 tokenId,
        uint256 nonce
    );

    event Redeem(
        address validator,
        address sender,
        uint256 tokenId,
        uint256 nonce,
        bytes signature
    );

    constructor(address _token) {
        token = IToken(_token);
        nonce = 0;
    }

    function setValidator(address _addr, bool _status)
    external onlyOwner
    {
        validators[_addr] = _status;
    }

    function getHash(address _validator, address _sender, uint256 _tokenId, uint256 _nonce)
    public pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(_validator, _sender, _tokenId, _nonce));
    }

    function recoverSigner(bytes32 _hash, bytes memory _signature)
    private pure returns (address)
    {
        bytes32 ethSignedMessageHash = ECDSA.toEthSignedMessageHash(_hash);
        return ECDSA.recover(ethSignedMessageHash, _signature);
    }

    function initSwap(uint256 _tokenId)
    external
    {
        token.transferFrom(msg.sender, address(this), _tokenId);
        emit Init(msg.sender, _tokenId, nonce);
        nonce++;
    }

    function redeemSwap(address _validator, address _sender, uint256 _tokenId, uint256 _nonce, bytes calldata _signature)
    external
    {
        bytes32 hash = getHash(_validator, _sender, _tokenId, _nonce);
        require(validators[recoverSigner(hash, _signature)] , 'Signature is wrong');
        require(!nonces[_nonce], 'Already transferred');
        nonces[_nonce] = true;
        token.transfer(_sender, _tokenId);
        emit Redeem(_validator, _sender, _tokenId, _nonce, _signature);
    }
}