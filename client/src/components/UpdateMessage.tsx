import { useState } from 'react';
import { Hex, type Hash, encodeFunctionData } from 'viem';
import { messageBoardAbi } from '../abi';
import { createTransaction } from '../biconomy/createTransaction';
import { createAccount } from '../biconomy/createAccount';
import { useEthersSigner } from '../utils';
import { polygonMumbai } from 'wagmi/chains';
import { providers, ethers } from 'ethers';
import { BiconomySmartAccount } from '@biconomy/account';

export function UpdateMessage() {
  const [message, setMessage] = useState<string>();
  const signer = useEthersSigner({ chainId: polygonMumbai.id });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  async function handleSponsoredTransaction(
    biconomySmartAccount: BiconomySmartAccount
  ) {
    await createTransaction({
      messageData: encodeFunctionData({
        abi: messageBoardAbi,
        functionName: 'setMessage',
        args: [message as string]
      }) as Hash,      
      smartAccount: biconomySmartAccount,
    });
  }

  function handleUnsponsoredTransaction() {
    // TODO: implement
  }

  let allowed: Boolean = true;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { biconomySmartAccount } = await createAccount({
      signer: signer as providers.JsonRpcSigner,
    });
    if (allowed) {
      handleSponsoredTransaction(biconomySmartAccount);
    } else {
      handleUnsponsoredTransaction();
    }
  };
  return (
    <div className='flex w-full'>
      <form className='flex w-full' onSubmit={handleSubmit}>
        <div className='flex w-full'>
          {/* Message input */}
          {/* <label> */}
          <input
            type='text'
            className='font-unica77 text-base text-primary w-full h-full px-4 focus:outline-none border-b-[1px] border-black'
            value={message}
            onChange={handleChange}
            placeholder='Update message'
          />
          {/* </label> */}
          <div className='justify-end'>
            {/* Submit button */}
            <button
              type='submit'
              className='w-[400px] h-14 p-4 bg-neutral-800 justify-center items-center inline-flex'
            >
              <div className='text-zinc-100 text-base font-normal uppercase leading-normal tracking-[4px]'>
                Submit
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
