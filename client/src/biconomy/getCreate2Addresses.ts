import {
  BiconomySmartAccount,
  type BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from '@biconomy/account';
import { IBundler, Bundler } from '@biconomy/bundler'
import { ChainId } from '@biconomy/core-types';
import { type Hex, createWalletClient, custom } from 'viem';
import { polygonMumbai } from 'wagmi/chains';
import { providers, Wallet } from 'ethers';


// need a provider that has accounts, 
// need an EOA specific provider
const provider = new providers.JsonRpcProvider(
  'https://polygon-mumbai.g.alchemy.com/v2/ZDTDqfiqS5YidAxakpGcNPOorruQePyK'
);
// const wallet = new Wallet(process.env.PRIVATE_KEY || "", provider);

const bundler: IBundler = new Bundler({
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/abc', // you can get this value from biconomy dashboard.     
  chainId: ChainId.POLYGON_MUMBAI,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
})

const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
  signer: provider.getSigner(),
  chainId: ChainId.POLYGON_MUMBAI,
  bundler: bundler,
  rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/ZDTDqfiqS5YidAxakpGcNPOorruQePyK',
  // paymaster: paymaster, //you can skip paymaster instance if you are not interested in transaction sponsorship
  // bundler: bundler,
};

export async function getCreate2Addresses({
  holdersQueryResponse,
}: {
  holdersQueryResponse: Hex[];
}) {
  const biconomyAccount = new BiconomySmartAccount(biconomySmartAccountConfig);
  // init that this EOA and this smart contract address will be tied together
  const biconomySmartAccount = await biconomyAccount.init();
  console.log(biconomySmartAccount)
  // console.log(
  //   'Smart account address:',
  //   await biconomyAccount.getSmartAccountAddress()
  // );
  // console.log(
  //   'Smart account address:',
  //   await biconomySmartAccount.getSmartAccountAddress()
  // );
}
