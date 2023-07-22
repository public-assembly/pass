import { clientPublic } from '../../../viem/clients';
import { entrypointContract } from './../../../entrypoint';

export async function GET(request: Request) {
  const [getUserOpHash] = await Promise.all([
    clientPublic.readContract({
      ...entrypointContract,
      functionName: 'getUserOpHash',
      args: [
        {
          sender: `0x38958f8b2aE828ECa1E2a30C8e931d224CAda075`,
          nonce: 4333n,
          initCode: `0x`,
          callData: `0x`,
          callGasLimit: 40340034n,
          verificationGasLimit: 40340034n,
          preVerificationGas: 40340034n,
          maxFeePerGas: 40340034n,
          maxPriorityFeePerGas: 40340034n,
          paymasterAndData: `0x`,
          signature: `0x`,
        },
      ],
    }),
  ]);

  const data = {
    contract_address: entrypointContract.address,
    op_hash: getUserOpHash,
  };

  return Response.json({ data: data });
}