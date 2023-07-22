// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";

import {Merkle} from "../src/Merkle.sol";

contract MerkleTest is Test {

    // NOTE:
    // Hardcoded merkle root + proof values generated using Lanyard api
    // See lanyard docs https://lanyard.org/docs

    Merkle merkle;
    bytes32 merkleRoot = 0x640c46ede06e553b55939cfbfe691196cd77036569f3459a72a23a803c2d0dd3;
    address includedAddress_1 = 0xE7746f79bF98e685e6a1ac80D74d2935431041d5;
    bytes32 includedAddress_1_Proof = 0xb3a751cbc121f97d50361c8c86ffc8b67e895e51f3df3d6f8bb965aac8a9b726;
    address includedAddress_2 = 0x004991c3bbcF3dd0596292C80351798965070D75;
    bytes32 includedAddress_2_Proof = 0xdea286342a952f39bdeb7eb6d2d7b7ae708e39d4b0215be929d077462c9792a0;
    address nonIncludedAddress = 0x0000000000000000000000000000000000000001;
    bytes32 nonIncludedAddress_Proof = 0x000000342a952f39bdeb7eb6d2d7b7ae708e39d4b0215be929d077462c000000;

    function setUp() external {
        merkle = new Merkle(merkleRoot);
    }

    function test_IsAllowed() external {
        bytes32[] memory proof = new bytes32[](1);
        proof[0] = includedAddress_1_Proof;
        vm.prank(includedAddress_1);
        bool allowed = merkle.isAllowed(proof);
        require(allowed == true, "allowed should return true");

        bytes32[] memory secondProof = new bytes32[](1);
        secondProof[0] = includedAddress_2_Proof;
        vm.prank(0x004991c3bbcF3dd0596292C80351798965070D75);
        bool secondAllowed = merkle.isAllowed(secondProof);
        require(secondAllowed == true, "second allowed should return true");        
    }

    function test_IsNotAllowed() external {
        bytes32[] memory proof = new bytes32[](1);
        proof[0] = nonIncludedAddress_Proof;        
        vm.prank(nonIncludedAddress);
        bool allowed = merkle.isAllowed(proof);        
        require(allowed == false, "allowed should return false");
    }
}
