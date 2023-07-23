import { type Hex } from 'viem';
import { smartAccountFactoryAbi } from '../abi/smartAccountFactoryAbi';
import { mumbaiClient } from '../viem/client';

export async function getAddressesForCounterFactualAccounts({
  holdersQueryResponse,
}: {
  holdersQueryResponse: Hex[];
}) {
  //   let owner as Hex
  // const ownerArray: Hex[] = [
  //   '0xF2365A26f766109b5322B0f90d71c21bF32bda04',
  //   '0x784FA0c3C12aEe8f571EF3c91408cb2219B431dC',
  // ];

  //   const counterFactualAddress = await mumbaiClient?.readContract({
  //     address: '0x000000F9eE1842Bb72F6BBDD75E6D3d4e3e9594C',
  //     abi: smartAccountFactoryAbi,
  //     functionName: 'getAddressForCounterFactualAccount',
  //     // owner (Hex), index (BigInt)
  //     args: [owner, BigInt(0)],
  //   });
  console.log('typppe: ', typeof holdersQueryResponse);
  const thebag = holdersQueryResponse;
  console.log('holders:', thebag);

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
