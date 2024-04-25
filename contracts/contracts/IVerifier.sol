// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

interface ISquadVerifier {
    function verify(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs
    ) external view returns (bool);
}
