import { DEFAULT_ENTRYPOINT_ADDRESS } from '@biconomy/account';
import { IBundler, Bundler } from '@biconomy/bundler';
import { ChainId } from '@biconomy/core-types';

export const bundlerInstance: IBundler = new Bundler({
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/abc', // you can get this value from biconomy dashboard.
  chainId: ChainId.POLYGON_MUMBAI,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});
