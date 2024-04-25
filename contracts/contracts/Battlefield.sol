// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./IVerifier.sol";

contract Battle is ERC721 {
    uint public constant MAX_SQUAD_SIZE = 10;

    struct Params {
        bytes32 userOneSquadHash;
        address userTwo;
        uint[] userTwoSquad;
    }

    ISquadVerifier public squadVerifier;
    uint public nextTokenId;
    mapping(uint tokenId => Params params) public params;

    constructor(address _squadVerifier) ERC721("Battle", "BTL") {
        squadVerifier = ISquadVerifier(_squadVerifier);
    }

    function start(bytes memory _squadProof, bytes32 _squadHash) public {
        // Set up verifier's public input from the caller's input
        bytes32[] memory publicInputs = new bytes32[](1);
        publicInputs[0] = _squadHash;
        // Verify integrity of squad configuration
        require(
            squadVerifier.verify(_squadProof, publicInputs),
            "Invalid squad configuration"
        );
        // Mint token
        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);
        // Set params
        Params memory prms;
        prms.userOneSquadHash = _squadHash;
        params[tokenId] = prms;
    }

    function join(uint _tokenId, uint[] memory _squad) public {
        // Check the squad
        require(_squad.length == 3, "Squad length incorrect");
        require(
            _squad[0] + _squad[1] + _squad[2] == MAX_SQUAD_SIZE,
            "Squad size incorrect"
        );
        // Check params
        _requireOwned(_tokenId);
        require(
            params[_tokenId].userTwo == address(0),
            "The battle already has the second user"
        );
        // Update params
        params[_tokenId].userTwo = msg.sender;
        params[_tokenId].userTwoSquad = _squad;
    }

    // TODO:
    function end(uint _tokenId, uint _result, bytes calldata _proof) public {}

    function getParams(uint _tokenId) public view returns (Params memory) {
        return params[_tokenId];
    }
}
