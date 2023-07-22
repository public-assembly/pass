// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script} from 'forge-std/Script.sol';

import {MessageBoard} from "src/MessageBoard.sol";
import {PASS} from "src/PASS.sol";

import {IEntryPoint} from "account-abstraction/interfaces/IEntryPoint.sol";

/// @notice A very simple deployment script
contract Deploy is Script {

  address constant entryPoint = 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;
  address constant initialOwner = 0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170;
  bytes32 constant initialMerkleRoot = 0x27edd90df9c6e4c99cf75f473ec3f223c27b08ba3135a109cec1b032a6a08db4;
  MessageBoard messageBoard;
  PASS pass;

  /// @notice The main script entrypoint
  /// @return messageBoard The deployed messageBoard
  /// @return pass The deployed PASS paymaster
  function run() external returns (MessageBoard messageBoard, PASS pass) {
    uint256 deployerPrivateKey = vm.envUint("DEPLOYER_KEY");
    vm.startBroadcast(deployerPrivateKey);        
    
    messageBoard = new MessageBoard();
    pass = new PASS(initialOwner, initialMerkleRoot, IEntryPoint(entryPoint));

    vm.stopBroadcast();
  }
}

// ======= DEPLOY SCRIPTS =====

// source .env
// forge script script/Deploy.s.sol:Deploy --rpc-url $MUMBAI_RPC_URL --broadcast --verify -vvvv --verifier-url $MUMBAI_POLYGONSCAN_URL