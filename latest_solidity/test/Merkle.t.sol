// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";

import {Merkle} from "../src/Merkle.sol";

import {BytesLib} from "solidity-bytes-utils/BytesLib.sol";

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

        address paymaster = 0x6a2518fdA4b9EaCe4fAd9120a61C8Eb255DEb624;
        bytes32[] memory lolProof = new bytes32[](2);
        lolProof[0] = 0xcc6133a2c98d9f761a9f9d57e1b8364e5bdb293b8e906fdd922d481837474bb9;
        lolProof[1] = 0xc70b79d5f2cf82eef5c5bbe0cf674ea7612e9657c437c73b969b5a167a6dda7a;
        bytes memory valuesForLife = abi.encodePacked(paymaster, lolProof);
        console2.logBytes(valuesForLife);
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

    function test_ourLittleDecoder() external {
        address ourPaymaster = 0x0a82336cf2D2033713142c1fBEad291391f6975c;
        bytes32[] memory ourMerkleProof = new bytes32[](1);
        ourMerkleProof[0] = 0x17acb4ff94de4507c451f2e1249d674967ca610f11f48b49c2bc5d7d19b45822;
        // ourMerkleProof[1] = 0xc70b79d5f2cf82eef5c5bbe0cf674ea7612e9657c437c73b969b5a167a6dda7a;

        bytes memory paymasterAndData = hex"0a82336cf2d2033713142c1fbead291391f6975c0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000117acb4ff94de4507c451f2e1249d674967ca610f11f48b49c2bc5d7d19b45822";
        console2.log('Paymaster length', paymasterAndData.length);
        bytes memory first20Bytes = BytesLib.slice(paymasterAndData, 0, 20);
        address first20BytesConverted = BytesLib.toAddress(first20Bytes, 0);

        bytes memory trailingBytes = BytesLib.slice(paymasterAndData, 20, 96);
        (bytes32[] memory decodedMerkleProof) = abi.decode(trailingBytes, (bytes32[]));

        require(first20BytesConverted == ourPaymaster, "address not correct");
        require(keccak256(abi.encodePacked(decodedMerkleProof)) == keccak256(abi.encodePacked(ourMerkleProof)), "merkle proof decoding didnt work");
    }   
}

// contract PASSTest is Test {

//     /*
//         Tests to write:
//         1. Do deposits work 
//             a) call `depositTo` on Entrypoint.sol and pass in PASS as the `to` value along with X msgValue
//             b) confirm that `balanceOf` on PASS returns the expected deposits[account].deposit value
//         2. Generate smart accounts from counterfactual EOAs and prove they belong in merkle tree
//             a) provide (hardccode) two example EOAs
//             b) generate smart accounts for both of them
//             c) provide (hardcode) merkleRoot based on both of those smart accounts
//             d) confirm those accounts return `true` on some type of `isAllowed` public call on paymaster
//         3. Perform a successful `simulateValidation`
//             a) pass in a UserOp to the Entropoint contract that successfully reverts on the Entrypoint
//     */


//     function setUp() external {
