// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "./IVerifier.sol";

contract Battle is ERC721 {
    uint public constant MAX_SQUAD_SIZE = 10;

    event Started(uint tokenId, Params params);
    event Joined(uint tokenId, Params params);
    event Ended(uint tokenId, Params params);

    struct Params {
        uint[] userOneSquad;
        bytes32 userOneSquadHash;
        address userTwo;
        uint[] userTwoSquad;
        uint result;
        int btcUsd;
        int ethUsd;
        int linkUsd;
        uint started;
        uint joined;
        uint ended;
    }

    IVerifier public squadVerifier;
    IVerifier public battleVerifier;
    AggregatorV3Interface public btcUsdDataFeed;
    AggregatorV3Interface public ethUsdDataFeed;
    AggregatorV3Interface public linkUsdDataFeed;
    uint public nextTokenId;
    mapping(uint tokenId => Params params) public params;

    constructor(
        address _squadVerifier,
        address _battleVerifier,
        address _btcUsdDataFeed,
        address _ethUsdDataFeed,
        address _linkUsdDataFeed
    ) ERC721("Battle", "BTL") {
        squadVerifier = IVerifier(_squadVerifier);
        battleVerifier = IVerifier(_battleVerifier);
        btcUsdDataFeed = AggregatorV3Interface(_btcUsdDataFeed);
        ethUsdDataFeed = AggregatorV3Interface(_ethUsdDataFeed);
        linkUsdDataFeed = AggregatorV3Interface(_linkUsdDataFeed);
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
        // Emit event
        emit Started(tokenId, params[tokenId]);
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
        // Emit event
        emit Joined(_tokenId, params[_tokenId]);
    }

    function end(
        uint _tokenId,
        uint[] memory userOneSquad,
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
        // Calculate result with boosters
        (
            uint result,
            int btcUsd,
            int ethUsd,
            int linkUsd
        ) = _calculateResultWithBoosters(
                userOneSquad,
                params[_tokenId].userTwoSquad
            );
        // Update params
        params[_tokenId].userOneSquad = userOneSquad;
        params[_tokenId].result = result;
        params[_tokenId].btcUsd = btcUsd;
        params[_tokenId].ethUsd = ethUsd;
        params[_tokenId].linkUsd = linkUsd;
        params[_tokenId].ended = block.timestamp;
        // Emit event
        emit Ended(_tokenId, params[_tokenId]);
    }

    function getParams(uint _tokenId) public view returns (Params memory) {
        return params[_tokenId];
    }

    function getBtcUsdDataFeedLatestAnswer() public view returns (int) {
        if (address(btcUsdDataFeed) == address(0)) {
            return 0;
        }
        (, int answer, , , ) = btcUsdDataFeed.latestRoundData();
        return answer;
    }

    function getEthUsdDataFeedLatestAnswer() public view returns (int) {
        if (address(ethUsdDataFeed) == address(0)) {
            return 0;
        }
        (, int answer, , , ) = ethUsdDataFeed.latestRoundData();
        return answer;
    }

    function getLinkUsdDataFeedLatestAnswer() public view returns (int) {
        if (address(linkUsdDataFeed) == address(0)) {
            return 0;
        }
        (, int answer, , , ) = linkUsdDataFeed.latestRoundData();
        return answer;
    }

    function _calculateResultWithBoosters(
        uint[] memory _userOneSquad,
        uint[] memory _userTwoSquad
    ) internal view returns (uint result, int btcUsd, int ethUsd, int linkUsd) {
        // Define default values
        uint btcUnitHealth = 6;
        uint btcUnitAttack = 1;
        uint ethUnitHealth = 4;
        uint ethUnitAttack = 2;
        uint linkUnitHealth = 2;
        uint linkUnitAttack = 3;
        // Accept boosters
        int _btcUsd = getBtcUsdDataFeedLatestAnswer() / 1_000_000;
        if (_btcUsd > 0 && _btcUsd % 2 == 0) {
            btcUnitHealth = btcUnitHealth * 2;
        }
        int _ethUsd = getEthUsdDataFeedLatestAnswer() / 1_000_000;
        if (_ethUsd > 0 && _ethUsd % 2 == 1) {
            ethUnitAttack = ethUnitAttack * 2;
        }
        int _linkUsd = getLinkUsdDataFeedLatestAnswer() / 1_000_000;
        if (_linkUsd > 0 && _linkUsd % 5 == 0) {
            linkUnitHealth = linkUnitHealth * 3;
        }
        // Calculate health
        uint userOneHealth = _userOneSquad[0] *
            btcUnitHealth +
            _userOneSquad[1] *
            ethUnitHealth +
            _userOneSquad[2] *
            linkUnitHealth;
        uint userTwoHealth = _userTwoSquad[0] *
            btcUnitHealth +
            _userTwoSquad[1] *
            ethUnitHealth +
            _userTwoSquad[2] *
            linkUnitHealth;
        // Calculate attack
        uint userOneAttack = _userOneSquad[0] *
            btcUnitAttack +
            _userOneSquad[1] *
            ethUnitAttack +
            _userOneSquad[2] *
            linkUnitAttack;
        uint userTwoAttack = _userTwoSquad[0] *
            btcUnitAttack +
            _userTwoSquad[1] *
            ethUnitAttack +
            _userTwoSquad[2] *
            linkUnitAttack;
        // Calculate health after attack
        userOneHealth -= userTwoAttack;
        userTwoHealth -= userOneAttack;
        // Calculate result (1 - user one won, 2 - user two won, 3 - draw)
        uint _result = 3;
        if (userOneHealth > userTwoHealth) {
            _result = 1;
        }
        if (userOneHealth < userTwoHealth) {
            _result = 2;
        }
        return (_result, _btcUsd, _ethUsd, _linkUsd);
    }
}
