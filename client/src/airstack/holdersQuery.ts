export const HoldersQuery = `query Holders {
  TokenBalances(
    input: {filter: {tokenAddress: {_eq: "0x53202d706d9b49d72b796105c5c2c9ecee093740"}}, blockchain: polygon, limit: 50}
  ) {
    TokenBalance {
      owner {
        addresses
      }
    }
  }
}`;
