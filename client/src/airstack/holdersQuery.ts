import { gql } from 'graphql-request';

export const holdersQuery = gql`
  {
    TokenBalances(
      input: {
        filter: {
          tokenAddress: { _eq: "0x53202d706d9b49d72b796105c5c2c9ecee093740" }
        }
        blockchain: polygon
        limit: 10
      }
    ) {
      TokenBalance {
        owner {
          addresses
        }
      }
    }
  }
`;
