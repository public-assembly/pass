import { init, useLazyQuery } from '@airstack/airstack-react';
import { useCallback, useEffect, useState } from 'react';
import { holdersQuery } from '../airstack/holdersQuery';
import { useOwners } from '../contexts/OwnersContext'; // Import the useOwners hook
import useSetMerkleRoot from '../hooks/useSetMerkleRoot';
import getLanyardTree from '../lanyard/useLanyardTree';
import SearchResults from './SearchResults';

init('aa041bf62ade490285e2af27504d6506');
export type OwnerAddress = `0x${string}`;

export function TokenSearch() {
  const { owners, setOwners } = useOwners();
  const [contractAddress, setContractAddress] = useState<string>('');

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
        ownerAddresses.filter((address) => address !== null) as OwnerAddress[]
      );
    }
  }, [data, setOwners]);

  useEffect(() => {
    (async () => {
      if (data && owners.length > 0) {
        try {
          const lanyardTree = await getLanyardTree(owners);
          console.log('Lanyard Tree:', lanyardTree.merkle);
          if (lanyardTree.merkle !== null) {
            // Check if merkle is not null before calling useSetMerkleRoot
            useSetMerkleRoot({
              merkleRoot: lanyardTree.merkle,
            });
          }
        } catch (err) {
          console.log('Error fetching lanyard tree:', err);
        }
      }
    })();
  }, [data, owners]);

  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <label>
          Enter Contract Address:
          <input
            type='text'
            value={contractAddress}
            onChange={handleContractAddressChange}
            className='border-black border-2 min-w-full rounded-md px-4 py-2'
          />
        </label>
        <button
          type='submit'
          className='border-black border-2 min-w-full rounded-md px-4 py-2'
        >
          Submit
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && !loading && <SearchResults owners={owners} />}
    </div>
  );
}
