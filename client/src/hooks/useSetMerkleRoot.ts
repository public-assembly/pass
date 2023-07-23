import { Hash } from 'viem';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { passAbi } from '../abi';
import { passPaymaster } from '../constants/addresses';

type Props = {
  merkleRoot: Hash;
};

export function useSetMerkleRoot({ merkleRoot }: Props) {
  const { config, error } = usePrepareContractWrite({
    address: passPaymaster,
    abi: passAbi,
    functionName: 'setMerkleRoot',
    args: [
      merkleRoot, // mint quantity always hardcoded to 1
    ],
  });

  const {
    write,
    data,
    error: writeError,
    isError,
    isLoading,
    isSuccess,
    status,
  } = useContractWrite(config);

  // Wait for data from mintExisting call
  const { data: mintExistingData, isLoading: mintExistingLoading } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  return {
    config,
    error,
    write,
    writeError,
    data,
    isError,
    isLoading,
    isSuccess,
    status,
    mintExistingData,
    mintExistingLoading,
  };
}

export default useSetMerkleRoot;
