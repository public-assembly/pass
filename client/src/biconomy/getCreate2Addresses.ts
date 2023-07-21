import {
  BiconomySmartAccount,
  type BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from '@biconomy/account';
import { type Hex, createWalletClient, custom } from 'viem';
import { polygonMumbai } from 'wagmi/chains';

const client = createWalletClient({
  chain: polygonMumbai,
  // TODO: Why is there a typescript error here?
  // @ts-ignore
  transport: custom(window.ethereum),
});

const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
  // TODO: Does this even work?
  signer: client,
  chainId: polygonMumbai.id,
  rpcUrl: '',
  // paymaster: paymaster, //you can skip paymaster instance if you are not interested in transaction sponsorship
  // bundler: bundler,
};

export async function getCreate2Addresses({
  holdersQueryResponse,
}: {
  holdersQueryResponse: Hex[];
}) {
//   const biconomyAccount = new BiconomySmartAccount(biconomySmartAccountConfig);
//   const biconomySmartAccount = await biconomyAccount.init();
}
