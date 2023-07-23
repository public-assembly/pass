import { init, useLazyQuery } from '@airstack/airstack-react';
import { useCallback, useEffect, useState } from 'react';
import { holdersQuery } from '../airstack/holdersQuery';
import { useOwners } from '../contexts/OwnersContext'; // Import the useOwners hook
import useSetMerkleRoot from '../hooks/useSetMerkleRoot';
import getLanyardTree from '../lanyard/getLanyardTree';
import SearchResults from './SearchResults';
import { type Hash } from 'viem';

init('aa041bf62ade490285e2af27504d6506');
export type OwnerAddress = `0x${string}`;

export function TokenSearch() {
  const { owners, setOwners } = useOwners();
  const [contractAddress, setContractAddress] = useState<string>('');
  const [root, setRoot] = useState<Hash>();

  const [fetch, { data, loading, error }] = useLazyQuery(holdersQuery);

  const handleContractAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContractAddress(event.target.value);
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      fetch({
        contractAddress,
      });
      writeMerkleRoot?.();
    },

    [fetch, contractAddress]
  );

  useEffect(() => {
    if (data) {
      const ownerAddresses = data?.TokenBalances?.TokenBalance?.map(
        (item: any) => item?.owner?.addresses[0]
      ) as (OwnerAddress | null)[]; // Explicitly define the type to include null
      // Update the global state with the result of the search
      setOwners(
        ownerAddresses?.filter((address) => address !== null) as OwnerAddress[]
      );
    }
  }, [data, setOwners]);

  const { writeMerkleRoot } = useSetMerkleRoot({ merkleRoot: root as Hash });

  useEffect(() => {
    (async () => {
      if (data && owners.length > 0) {
        try {
          const lanyardTree = await getLanyardTree(owners);
          console.log('Lanyard Tree:', lanyardTree.merkle);
          setRoot(lanyardTree.merkle as Hash);
        } catch (err) {
          console.log('Error fetching lanyard tree:', err);
        }
      }
    })();
  }, [data, owners]);

  return (
    <div className='fixed bottom-12 left-12'>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label>
          {/* Enter Contract Address: */}
          <input
            type='text'
            value={contractAddress}
            onChange={handleContractAddressChange}
            placeholder='Update allowlist'
            className='font-unica77 text-base text-primary px-4 focus:outline-none w-[400px] h-[56px]'
          />
        </label>

        <button
          type='submit'
          className='w-[400px] h-14 bg-neutral-800 justify-center items-center inline-flex'
        >
          <div className='text-zinc-100 text-base font-normal italic uppercase leading-normal tracking-[4px]'>
            Submit
          </div>
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && !loading && <SearchResults owners={owners} />}
    </div>
  );
}
