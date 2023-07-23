import * as lanyard from 'lanyard';
import { Hash } from 'viem';
import { getAddressesForCounterFactualAccounts } from '../biconomy/getAddressesForCounterFactualAccounts';

type OwnerAddress = `0x${string}`;

interface LanyardTreeError {
  message: string;
}

interface UseLanyardTreeResult {
  merkle: Hash | null;
  error: LanyardTreeError | null;
}

// Utility function to convert a string to Hash type (adds '0x' prefix)
const toHash = (value: string): Hash => `0x${value}`;

const getLanyardTree = async (
  owners: OwnerAddress[]
): Promise<UseLanyardTreeResult> => {
  try {
    const counterFactuals = await getAddressesForCounterFactualAccounts({
      holdersQueryResponse: owners,
    });

    if (counterFactuals) {
      const { merkleRoot } = await lanyard.createTree({
        unhashedLeaves: counterFactuals,
      });
      return { merkle: merkleRoot as Hash, error: null };
    } else {
      return { merkle: null, error: { message: 'lanyard tree failed' } };
    }
  } catch (error: any) {
    return { merkle: null, error: { message: error.message } };
  }
};

export default getLanyardTree;
