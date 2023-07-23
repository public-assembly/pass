import { init, useLazyQuery } from '@airstack/airstack-react';
import { useCallback, useEffect, useState } from 'react';
import { holdersQuery } from '../airstack/holdersQuery';
import { getAddressesForCounterFactualAccounts } from '../biconomy/getAddressesForCounterFactualAccounts';
import SearchResults from './SearchResults';

init('aa041bf62ade490285e2af27504d6506');
const LIMIT = 20;

export function TokenSearch() {
  const [owners, setOwners] = useState<`0x${string}`[]>([]);
  const [contractAddress, setContractAddress] = useState<string>('');
  console.log('contract address: ', contractAddress, typeof contractAddress);

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
      );

      setOwners(ownerAddresses);
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      if (data) {
        console.log('the addresss: ', owners); // owners will contain the latest value here
        try {
          const counterFacts = await getAddressesForCounterFactualAccounts({
            holdersQueryResponse: owners,
          });
          console.log('counters: ', counterFacts);
        } catch (err) {
          console.log('error', err);
        }
      }
    })();
  }, [data, owners]); // Use 'data' here, not 'owners'

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
