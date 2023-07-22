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

    function decodeHelper(bytes calldata paymasterAndData) public returns (bytes32[] memory) {
        (bytes32[] memory decodedMerkleProof) = abi.decode(
            paymasterAndData[20:],
            (bytes32[])
        );
        return decodedMerkleProof;
    }    

    // function decodeHelperExternal(bytes calldata paymasterAndData) external pure returns (bytes32[] memory) {
    //     bytes calldata slicedData = paymasterAndData[20:];
    //     return decodeHelper(slicedData);
    // }     


    function test_ourLittleDecoder() external {
        address ourPaymaster = 0x6a2518fdA4b9EaCe4fAd9120a61C8Eb255DEb624;
        bytes32[] memory ourMerkleProof = new bytes32[](2);
        ourMerkleProof[0] = 0xcc6133a2c98d9f761a9f9d57e1b8364e5bdb293b8e906fdd922d481837474bb9;
        ourMerkleProof[1] = 0xc70b79d5f2cf82eef5c5bbe0cf674ea7612e9657c437c73b969b5a167a6dda7a;

        bytes memory bro = hex"6a2518fda4b9eace4fad9120a61c8eb255deb62400000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002cc6133a2c98d9f761a9f9d57e1b8364e5bdb293b8e906fdd922d481837474bb9c70b79d5f2cf82eef5c5bbe0cf674ea7612e9657c437c73b969b5a167a6dda7a";

        (bytes32[] memory decodedMerkleProof) = decodeHelper(bro);

        // require(paymaster == ourPaymaster, "address decoding didnt work");
        require(keccak256(abi.encodePacked(decodedMerkleProof)) == keccak256(abi.encodePacked(ourMerkleProof)), "merkle proof decoding didnt work");
    }

    // function decodeHelper(bytes calldata paymasterAndData) public pure returns (bytes32[] memory) {
    //     // decode
    //     (bytes32[] memory decodedMerkleProof) = abi.decode(
    //         paymasterAndData[20:],
    //         (bytes32[])
    //     );
    //     // return
    //     return decodedMerkleProof;
    // }

    // function bytesMemoryToCalldata(bytes memory data) public pure returns (bytes calldata) {
    //     return convertToCalldata(data);
    // }

    // function convertToCalldata(bytes calldata data) public pure returns (bytes calldata) {
    //     return data;
    // }    


}



// import {Test} from "forge-std/Test.sol";
// import {console2} from "forge-std/console2.sol";

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
