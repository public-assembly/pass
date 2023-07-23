// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {BasePaymaster} from "account-abstraction/core/BasePaymaster.sol";
import {IEntryPoint} from "account-abstraction/interfaces/IEntryPoint.sol";
import {UserOperation} from "account-abstraction/interfaces/UserOperation.sol";
import {UserOperationLib} from "account-abstraction/interfaces/UserOperation.sol";
import {MerkleProofLib} from "solady/utils/MerkleProofLib.sol";

/**
 * Paymaster which pays for txs if the user is on an allowlist determined by a settable merkle root. 
 * For example it can represent membership in a DAO.
 */
contract PASS is BasePaymaster {
    using UserOperationLib for UserOperation;

    bytes32 public merkleRoot;

    constructor(address initialOwner, bytes32 initialMerkleRoot, IEntryPoint _entryPoint) BasePaymaster(_entryPoint) {
        _transferOwnership(initialOwner);
        merkleRoot = initialMerkleRoot;    
    }

    // error Not_On_Allowlist();

    event MerkleRootSet(
        address sender,
        bytes32 merkleRoot
    );

    function setMerkleRoot(bytes32 newMerkleRoot) onlyOwner external {
        merkleRoot = newMerkleRoot;
        emit MerkleRootSet(msg.sender, newMerkleRoot);        
    }

    /**
      * TODO: update comments
      * validate the request:
      * if this is a constructor call, make sure it is a known account.
      * verify the sender has enough tokens.
      * (since the paymaster is also the token, there is no notion of "approval")
      */
    function _validatePaymasterUserOp(
        UserOperation calldata userOp, 
        bytes32 /*userOpHash*/, 
        uint256 requiredPreFund
    ) internal view override returns (bytes memory context, uint256 validationData) {

        // Generate merkle leaf
        bytes32 leaf = keccak256(abi.encodePacked(userOp.sender));

        (bytes32[] memory decodedMerkleProof) = abi.decode(
            userOp.paymasterAndData[20:],
            (bytes32[])
        );

        if (MerkleProofLib.verify(decodedMerkleProof, merkleRoot, leaf)) {
            // userOp.sender is on allowlist so dont need to send data in context since paymaster will be paying
            return ("", 0);            
        } else {
            // userOp.sender is NOT on allowlist so need to pass the address of sender so it gets charged gas in `_postOp`
            return (abi.encode(userOp.sender), 1);
        }
    }

    // // when constructing an account, validate constructor code and parameters
    // // we trust our factory (and that it doesn't have any other public methods)
    // function _validateConstructor(UserOperation calldata userOp) internal virtual view {
    //     address factory = address(bytes20(userOp.initCode[0 : 20]));
    //     require(factory == theFactory, "TokenPaymaster: wrong account factory");
    // }

    /**
     * actual charge of user.
     * this method will be called just after the user's TX with mode==OpSucceeded|OpReverted (account pays in both cases)
     * BUT: if the user changed its balance in a way that will cause  postOp to revert, then it gets called again, after reverting
     * the user's TX , back to the state it was before the transaction started (before the validatePaymasterUserOp),
     * and the transaction should succeed there.
     */
    function _postOp(PostOpMode mode, bytes calldata context, uint256 actualGasCost) internal override {
        // //we don't really care about the mode, we just pay the gas with the user's tokens.
        // (mode);
        // address sender = abi.decode(context, (address));
        // //actualGasCost is known to be no larger than the above requiredPreFund, so the transfer should succeed.
        // address(this).call{value: actualGasCost + COST_OF_POST}("");
        
    }
}