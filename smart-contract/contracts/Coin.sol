// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Coin is ERC1155 {
  uint256 public constant GOLD = 0;
  uint256 public constant SILVER = 1;
  
  uint256[] public _tokenIds;
  mapping(uint256 => address) _tokenOwners;
  mapping(uint256 => string) _tokenURIs;
  mapping(address => uint[]) _ownerTokens;

  constructor() ERC1155(""){}

  function uri(uint256 _tokenId) public view override returns (string memory) {
    return _tokenURIs[_tokenId];
  }

  function addToken(uint256 _tokenId, string memory _uri) public returns(bool){
    _mint(msg.sender, _tokenId, 1, "");
    _tokenIds.push(_tokenId);
    _tokenOwners[_tokenId] = msg.sender;
    _ownerTokens[msg.sender].push(_tokenId);
    _setURI(_tokenId, _uri);
    return true;
  }

  function _setURI(uint256 _tokenId, string memory _uri) internal{
    _tokenURIs[_tokenId] = _uri;
  }

  function buySilver(uint256 _amount) public payable returns(bool){
    _mint(msg.sender, SILVER, _amount, "");
    return true;
  }

  function buyGold(uint256 _amount) public payable returns(bool){
    _mint(msg.sender, GOLD, _amount, "");
    return true;
  }

  function buyToken(address _from, address _to, uint256 _tokenId, uint256 _coinId, uint256 _amount) public returns(bool){
    _safeTransferFrom(_from, _to, _tokenId, 1, "");
    _tokenOwners[_tokenId] = _to;
    _ownerTokens[_to].push(_tokenId);
    
    //Removing token from previous owner owned tokenIds array
    uint i = 0;
    while (_ownerTokens[_from][i] != _tokenId) {
        i++;
    }
    while (i < _ownerTokens[_from].length - 1) {
      _ownerTokens[_from][i] = _ownerTokens[_from][i + 1];
      i++;
    }
    _ownerTokens[_from].pop();

    _safeTransferFrom(_to, _from, _coinId, _amount, "");
    return true;
  }

  function contractBalance() public view returns(uint256){
    return address(this).balance;
  }

  function getTokenIds() public view returns(uint256[] memory){
    return _tokenIds;
  }

  function getOwnerTokenIds(address _owner) public view returns(uint256[] memory){
    return _ownerTokens[_owner];
  }

  function getTokenInfo(uint256 _tokenId) public view returns(address owner, string memory uri){
    owner = _tokenOwners[_tokenId];
    uri = _tokenURIs[_tokenId];
  }

}