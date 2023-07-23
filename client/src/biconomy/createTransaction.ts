import { type Hash } from 'viem';
import { UserOperation } from '@biconomy/core-types';
import { bundlerInstance } from './bundlerInstance';
import { ethers } from 'ethers';
import { BiconomySmartAccount } from '@biconomy/account';
import { messageBoard, passPaymaster } from '../constants/addresses';

type UserOpGasResponse = {
  preVerificationGas: string;
  verificationGasLimit: string;
  callGasLimit: string;
  maxPriorityFeePerGas: string;
  maxFeePerGas: string;
};

type CreateTransactionProps = {
  messageData: Hash;
  smartAccount: BiconomySmartAccount;
  merkleProof: Hash[];
};

export async function createTransaction({
  messageData,
  smartAccount,
  merkleProof,
}: CreateTransactionProps) {
  const transaction = {
    to: messageBoard,
    data: messageData,
    value: '0',
  };

  let userOp: Partial<UserOperation> = {};

  try {
    userOp = await smartAccount.buildUserOp([transaction]);
  } catch (e) {
    console.log('error received ', e);
  }

  const encodedMerkleProof = ethers.utils.defaultAbiCoder.encode(
    ['bytes32[]'],
    [merkleProof]
  );

  // Concatenates the address of the Paymaster with a bytes-encoded bytes32 array
  const encodedPaymasterData = ethers.utils.hexConcat([
    passPaymaster,
    encodedMerkleProof,
  ]);

  userOp.paymasterAndData = encodedPaymasterData;

  let refinedGasLimit: Partial<UserOpGasResponse> = {};

  try {
    refinedGasLimit = await bundlerInstance.estimateUserOpGas(userOp);
    userOp.verificationGasLimit = refinedGasLimit.verificationGasLimit;
  } catch (e) {
    console.log('error received ', e);
  }

  try {
    const userOpResponse = await smartAccount.sendUserOp(userOp);
    const transactionDetail = await userOpResponse.wait();
    return transactionDetail;
  } catch (e) {
    console.log('error received ', e);
  }

  // If any of the steps above encountered an error, the function will return null.
  return null;
}
