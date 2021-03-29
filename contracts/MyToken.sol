// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract MyToken is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    address public creator;
    string public baseURI;
    mapping(uint256 => string) public messages;
    mapping(uint256 => uint256) public previous;
    mapping(uint256 => uint256[]) public branches;

    constructor(string memory _websiteURI)
        public
        ERC721("Tree Chan Node", "TCN")
    {
        creator = msg.sender;
        baseURI = _websiteURI;
    }

    function _setURI(string calldata _uri) public {
        baseURI = _uri;
    }

    function newThread(string memory _message) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        messages[newItemId] = _message;
        console.log("New Thread: %d", newItemId);
        console.log("Message: %s", _message);
        emit Transfer(address(0), msg.sender, newItemId);
        return newItemId;
    }

    function comment(uint256 _post, string memory _message)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        messages[newItemId] = _message;
        previous[newItemId] = _post;
        branches[_post].push(newItemId);
        emit Transfer(address(0), msg.sender, newItemId);
        return newItemId;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
