import { TokenSearch } from './TokenSearch';
import { messageBoard } from '../constants/addresses';

function AllowlistBadge() {
  return (
    <div className='w-[100px] h-7 px-2.5 py-1 bg-green-200 border border-neutral-800 justify-center items-center gap-2.5 inline-flex'>
      <div className='text-neutral-800 text-sm font-normal uppercase leading-tight tracking-wide'>
        allowlist
      </div>
    </div>
  );
}

export function AllowlistDash() {
  return (
    <>
      <AllowlistBadge />
      <p>
        Message board address
        <div className='w-[123px] h-7 px-2 py-1 border border-neutral-400 justify-start items-start gap-[367px] inline-flex'>
          <div className='text-neutral-800 text-sm font-normal uppercase leading-tight tracking-wide'>
            {messageBoard}
          </div>
        </div>
      </p>
      <TokenSearch />
    </>
  );
}
