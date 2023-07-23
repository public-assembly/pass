import {
  BiconomySmartAccount,
  type BiconomySmartAccountConfig,
} from '@biconomy/account';
import { ChainId } from '@biconomy/core-types';
import { providers } from 'ethers';
import { bundlerInstance } from './bundlerInstance';

export async function createAccount({
  signer,
}: {
  signer: providers.JsonRpcSigner;
}) {
  const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
    signer: signer as providers.JsonRpcSigner,
    chainId: ChainId.POLYGON_MUMBAI,
    bundler: bundlerInstance,
  };
  let biconomySmartAccount = new BiconomySmartAccount(
    biconomySmartAccountConfig
  );

  biconomySmartAccount = await biconomySmartAccount.init();

  return {
    biconomySmartAccount,
  };
}
