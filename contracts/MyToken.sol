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
    mapping(uint256 => uint256) public depth;
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
        depth[newItemId] = 0;
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
        depth[newItemId] = depth[_post] + 1;
        branches[_post].push(newItemId);
        emit Transfer(address(0), msg.sender, newItemId);
        return newItemId;
    }

    function getDepth(uint256 _token) external view returns (uint256) {
        return depth[_token];
    }

    function getBranches(uint256 _token)
        external
        view
        returns (uint256[] memory)
    {
        return branches[_token];
    }

    function getParents(uint256 _token)
        external
        view
        returns (uint256[] memory)
    {
        console.log("Starting. Depth: %d", depth[_token]);
        uint256[] memory parents = new uint256[](depth[_token]);
        uint256 i = depth[_token];
        uint256 currToken = _token;
        console.log("Before\n");
        while (i > 0) {
            currToken = previous[currToken];
            parents[i - 1] = currToken;
            i = i - 1;
        }
        return parents;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
