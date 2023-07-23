import { init, useLazyQuery } from '@airstack/airstack-react';
import { useEffect, useState } from 'react';
import { holdersQuery } from '../airstack/holdersQuery';

init('aa041bf62ade490285e2af27504d6506');

export function Airstack() {
  const [owners, setOwners] = useState<`0x${string}`[]>([]);
  const [contractAddress, setContractAddress] = useState<string>('');
  console.log('contract address: ', contractAddress, typeof contractAddress);

  const [fetchTokens, { data, loading, error }] = useLazyQuery(holdersQuery);

  const handleContractAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContractAddress(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    fetchTokens({
      contractAddress,
    });
  };

  useEffect(() => {
    if (data) {
      // const ownerAddresses = data.TokenBalances.TokenBalance.map(
      //   (item: any) => item.owner.addresses[0]
      // );

      // setOwners(ownerAddresses);
      console.log('dataaaa: ', data);
    }
  }, [data]);

  // useEffect(() => {
  //   (async () => {
  //     if (owners) {
  //       console.log('the addresss: ', owners);
  //       try {
  //         const counterFacts = await getAddressesForCounterFactualAccounts({
  //           holdersQueryResponse: owners,
  //         });
  //         console.log('counters: ', counterFacts);
  //       } catch (err) {
  //         console.log('error', err);
  //       }
  //     }
  //   })();
  // }, [owners]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Contract Address:
            <input
              type='text'
              value={contractAddress}
              onChange={handleContractAddressChange}
            />
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div>
        <strong>List of Owners</strong>
        {owners.length > 0 ? (
          <ul>
            {owners.map((address, i) => (
              <li key={i}>{address}</li>
            ))}
          </ul>
        ) : (
          <p>No owners data available</p>
        )}
      </div>
    </div>
  );
}
