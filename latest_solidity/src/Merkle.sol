// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {MerkleProofLib} from "solady/utils/MerkleProofLib.sol";

contract Merkle {

    // storage
    bytes32 public merkleRoot;

    // constructor
    constructor(bytes32 _merkleRoot) {
        merkleRoot = _merkleRoot;
    }

    // errors
    error Not_On_Allowlist();

    function isAllowed(bytes32[] calldata merkleProof) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        if (MerkleProofLib.verify(merkleProof, merkleRoot, leaf)) return true;
        return false;
    }

}
