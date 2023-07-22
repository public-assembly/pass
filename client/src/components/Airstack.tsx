// 'use client'

// import { init, useQuery } from '@airstack/airstack-react';
// import { HoldersQuery } from './holdersQuery';

// init('aa041bf62ade490285e2af27504d6506');

// export function Airstack() {
//   // variables
//   const { data, loading, error } = useQuery(HoldersQuery, { cache: false });

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   // console.log(typeof data);

//   let addressesArray = data.TokenBalances.TokenBalance.map(
//     (token: any) => {
//       const [address] = token.owner.addresses; // Destructuring the addresses array to get the first element
//       return address;
//     }
//   );

//   console.log(addressesArray);

//   // Render your component using the data returned by the query
//   return <>{JSON.stringify(data)}</>;
// }
