import { init, useQuery } from '@airstack/airstack-react';
import { HoldersQuery } from './holdersQuery';

init('aa041bf62ade490285e2af27504d6506');

export function Airstack() {
  // variables
  const { data, loading, error } = useQuery(HoldersQuery, { cache: false });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Render your component using the data returned by the query
  return <>{JSON.stringify(data)}</>;
}
