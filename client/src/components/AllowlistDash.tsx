import { TokenSearch } from './TokenSearch';
import { messageBoard } from '../constants/addresses';
import SearchResults from './SearchResults';

function AllowlistBadge() {
  return (
    <div className='w-[100px] h-7 px-2.5 py-1 bg-green-200 border border-neutral-800 justify-center items-center gap-2.5 inline-flex'>
      <div className='text-neutral-800 text-sm font-ibmPlex uppercase leading-normal tracking-wide'>
        allowlist
      </div>
    </div>
  );
}

export function AllowlistDash() {
  return (
    <div className='flex space-between m-12'>
    <div>
      <AllowlistBadge />
      <p >
        <span className='font-unica77'>Message board address</span>
        <div className='w-fit h-7 px-2 py-1 border border-neutral-400 justify-start items-start gap-[367px] inline-flex mr-12'>
          <div className='text-neutral-800 text-sm font-normal uppercase leading-tight tracking-wide'>
            {messageBoard}
          </div>
        </div>
      </p>
      <TokenSearch />
    </div>
    
    </div>
  );
}
