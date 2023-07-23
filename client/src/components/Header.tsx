import { ConnectKitButton } from 'connectkit';
import { Logo } from './Logo';

export function Header() {
  return (
    <div className='flex justify-between items-center p-4'>
      <div className='flex items-center gap-8'>
        <ConnectKitButton />
      </div>
      <Logo />
    </div>
  );
}
