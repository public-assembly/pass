import {
  BiconomySmartAccount,
  type BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from '@biconomy/account';
import { IBundler, Bundler } from '@biconomy/bundler';
import { ChainId } from '@biconomy/core-types';
import { polygonMumbai } from 'wagmi/chains';
import { providers, Wallet } from 'ethers';
import { useEffect, useState } from 'react';
import { useEthersSigner } from '../utils';

const bundler: IBundler = new Bundler({
  bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/abc', // you can get this value from biconomy dashboard.
  chainId: ChainId.POLYGON_MUMBAI,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

export function BiconomyInstance() {
  const [smartAccount, setSmartAccount] = useState<any>(null);
  const signer = useEthersSigner({ chainId: polygonMumbai.id });

  useEffect(() => {
    if (!signer) {
      console.log('No signer');
      return;
    }
    // prettier-ignore
    (async () => {
      try {
        const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
          signer: signer as providers.JsonRpcSigner,
          chainId: ChainId.POLYGON_MUMBAI,
          bundler: bundler,
          // paymaster: paymaster
        };
        let biconomySmartAccount = new BiconomySmartAccount(
          biconomySmartAccountConfig
        );
        // Initialize the Biconomy smart account
        biconomySmartAccount = await biconomySmartAccount.init();
        console.log('Owner: ', biconomySmartAccount.owner);
        console.log(
          'Address: ',
          await biconomySmartAccount.getSmartAccountAddress()
        );
        // console.log(
        //   'Is Account Deployed?:',
        //   await biconomySmartAccount.isAccountDeployed(
        //     await biconomySmartAccount.getSmartAccountAddress()
        //   )
        // );
        setSmartAccount(biconomySmartAccount);
      } catch (err) {
        console.log('Error setting up smart account... ', err);
      }
    })()
  }, [signer]);

//   return <>{JSON.stringify(smartAccount)}</>
  return <></>;
}
