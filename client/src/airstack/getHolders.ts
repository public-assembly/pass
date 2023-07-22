import { request } from 'graphql-request';
import { holdersQuery } from './holdersQuery';

export async function getHolders() {
  const holdersQueryResponse = await request(
    'https://api.airstack.xyz/gql',
    holdersQuery
  );

  // await request({ url, document, variables, requestHeaders })

  console.log(holdersQueryResponse);

  return holdersQueryResponse;
}
