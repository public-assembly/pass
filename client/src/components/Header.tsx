import { ConnectKitButton } from 'connectkit';
import { Caisson } from './Caisson';

export function Header() {
  return (
    <div className='flex justify-between items-center p-4'>
      <Caisson />
      <div className='flex items-center gap-8'>
        <ConnectKitButton />
      </div>
    </div>
  );
}
