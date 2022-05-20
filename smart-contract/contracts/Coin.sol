// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Coin is ERC1155 {
  uint256 public constant GOLD = 0;
  uint256 public constant SILVER = 1;
  
  uint256[] public _tokenIds;
  mapping(uint256 => address) _tokenOwners;
  mapping(uint256 => string) _tokenURIs;

  constructor() ERC1155(""){}

  function uri(uint256 _tokenId) public view override returns (string memory) {
    return _tokenURIs[_tokenId];
  }

  function addToken(uint256 _tokenId, string memory _uri) public returns(bool){
    _mint(msg.sender, _tokenId, 1, "");
    _tokenIds.push(_tokenId);
    _tokenOwners[_tokenId] = msg.sender;
    _setURI(_tokenId, _uri);
    return true;
  }

  function _setURI(uint256 _tokenId, string memory _uri) internal{
    _tokenURIs[_tokenId] = _uri;
  }

  function buySilver(uint256 _amount) public returns(bool){
    payable(address(this)).transfer(_amount/100);
    _mint(msg.sender, SILVER, _amount, "");
    return true;
  }

  function buyGold(uint256 _amount) public returns(bool){
    payable(address(this)).transfer(_amount/10);
    _mint(msg.sender, GOLD, _amount, "");
    return true;
  }

  function buyToken(address _from, address _to, uint256 _tokenId, uint256 _coinId, uint256 _amount) public returns(bool){
    _safeTransferFrom(_from, _to, _tokenId, 1, "");
    _safeTransferFrom(_to, _from, _coinId, _amount, "");
    return true;
  }

}