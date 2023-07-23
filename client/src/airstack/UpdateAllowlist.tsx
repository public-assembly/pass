export function UpdateAllowlist() {
  return (
    <div className='w-[400px] h-28 flex-col justify-start items-start inline-flex'>
      <div className='self-stretch p-4 shadow border border-neutral-800 justify-start items-center gap-2 inline-flex'>
        <div className='grow shrink basis-0 text-zinc-600 text-base font-light leading-normal'>
          Update allowlist
        </div>
      </div>
      <div className='w-[400px] p-4 bg-neutral-800 justify-center items-center inline-flex'>
        <button className='text-zinc-100 text-base font-normal uppercase leading-normal tracking-[4px]'>
          Submit
        </button>
      </div>
    </div>
  );
}
