import { type Hex } from 'viem';
import { smartAccountFactoryAbi } from '../abi/smartAccountFactoryAbi';
import { mumbaiClient } from '../viem/client';

export async function getAddressesForCounterFactualAccounts({
  holdersQueryResponse,
}: {
  holdersQueryResponse: Hex[];
}) {
  const counterFactualAddresses = await Promise.all(
    holdersQueryResponse.map((owner) =>
      mumbaiClient?.readContract({
        address: '0x000000F9eE1842Bb72F6BBDD75E6D3d4e3e9594C',
        abi: smartAccountFactoryAbi,
        functionName: 'getAddressForCounterFactualAccount',
        // owner (Hex), index (BigInt)
        args: [owner, BigInt(0)],
      })
    )
  );

  return counterFactualAddresses;
}
