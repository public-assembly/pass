const old = '0x53202d706d9b49d72b796105c5c2c9ecee093740';

export const holdersQuery = `
  query GetTokenBalances($contractAddress: Address) {
    TokenBalances(
      input: {
        filter: { tokenAddress: { _eq: $contractAddress } }
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
`;
