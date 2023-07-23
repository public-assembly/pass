import { useState } from 'react';

export function UpdateMessage() {
  const [message, setMessage] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
