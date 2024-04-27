// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./IVerifier.sol";

contract Battle is ERC721 {
    uint public constant MAX_SQUAD_SIZE = 10;

    // TODO: Add prices used for boosters
    struct Params {
        bytes32 userOneSquadHash;
        address userTwo;
        uint[] userTwoSquad;
        uint result;
        uint started;
        uint joined;
        uint ended;
    }

    IVerifier public squadVerifier;
    IVerifier public battleVerifier;
    uint public nextTokenId;
    mapping(uint tokenId => Params params) public params;

    constructor(
        address _squadVerifier,
        address _battleVerifier
    ) ERC721("Battle", "BTL") {
        squadVerifier = IVerifier(_squadVerifier);
        battleVerifier = IVerifier(_battleVerifier);
    }

    function start(bytes memory _squadProof, bytes32 _squadHash) public {
        // Set up public input to verify squad
        bytes32[] memory publicInputs = new bytes32[](1);
        publicInputs[0] = _squadHash;
        // Check if the squad proof is valid
        require(
            squadVerifier.verify(_squadProof, publicInputs),
            "Failed to verify the squad"
        );
        // Mint token
        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);
        // Set params
        Params memory prms;
        prms.userOneSquadHash = _squadHash;
        prms.started = block.timestamp;
        params[tokenId] = prms;
    }

    function join(uint _tokenId, uint[] memory _squad) public {
        // Check data
        _requireOwned(_tokenId);
        require(_squad.length == 3, "Squad length incorrect");
        require(
            _squad[0] + _squad[1] + _squad[2] == MAX_SQUAD_SIZE,
            "Squad size incorrect"
        );
        require(
            _requireOwned(_tokenId) != msg.sender,
            "Owner cannot be user two"
        );
        require(
            params[_tokenId].userTwo == address(0),
            "The battle already has user two"
        );
        // Update params
        params[_tokenId].userTwo = msg.sender;
        params[_tokenId].userTwoSquad = _squad;
        params[_tokenId].joined = block.timestamp;
    }

    function end(
        uint _tokenId,
        uint _battleResult,
        bytes calldata _battleResultProof
    ) public {
        // Check data
        _requireOwned(_tokenId);
        require(params[_tokenId].result == 0, "The battle already ended");
        // Set up public input to verify battle result
        bytes32[] memory publicInputs = new bytes32[](5);
        publicInputs[0] = params[_tokenId].userOneSquadHash;
        publicInputs[1] = bytes32(params[_tokenId].userTwoSquad[0]);
        publicInputs[2] = bytes32(params[_tokenId].userTwoSquad[1]);
        publicInputs[3] = bytes32(params[_tokenId].userTwoSquad[2]);
        publicInputs[4] = bytes32(_battleResult);
        // Check if the battle result proof is valid
        if (!battleVerifier.verify(_battleResultProof, publicInputs)) {
            revert("Failed to verify the battle result");
        }
        // Update params
        params[_tokenId].result = _battleResult;
        params[_tokenId].ended = block.timestamp;
    }

    function getParams(uint _tokenId) public view returns (Params memory) {
        return params[_tokenId];
    }
}
