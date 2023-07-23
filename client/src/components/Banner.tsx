import { useContractRead } from 'wagmi';
import { messageBoardAbi } from '../abi';
import Marquee from 'react-fast-marquee';

export function Banner() {
  const { data: bannerMessage } = useContractRead({
    address: '0x615a8Dfb1E751177b703e9031Fb70cE6D9F8a366',
    abi: messageBoardAbi,
    functionName: 'message',
    // TODO: fix this
    chainId: 80001,
  });

  //   console.log(bannerMessage)

  return (
    <section>
      <div className='bg w-full h-48 relative bg-dim border-neutral-800 justify-center'>
        <img
          src='https://i.postimg.cc/NGr9fR3r/BGPATTERN.png'
          className='w-full h-full'
        />

        <div className='bg w-full h-48 py-12 left-0 top-0 absolute border-t border-b border-neutral-800 justify-center items-center inline-flex'>
          {/* 125 */}
          <Marquee speed={125}>
            <h1 className='text-black text-8xl font-VT323 uppercase leading-[64px]'>
              {bannerMessage}
            </h1>
          </Marquee>
        </div>

        {/* Green message tag */}
        <div className='w-[82px] h-7 px-2.5 py-1 left-0 top-0 absolute bg-green-200 border border-neutral-800 justify-center items-center gap-2.5 inline-flex'>
          <div className='text-neutral-800 text-sm font-ibmPlex uppercase leading-normal tracking-wide'>
            message
          </div>
        </div>
      </div>
    </section>
  );
}
