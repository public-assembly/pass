'use client';

import { BiconomyInstance } from '../biconomy/BiconomyInstance';
import { Header, Banner, Authenticate, UpdateMessage } from '../components';
import { TokenSearch } from '../components/TokenSearch';
import { useAccount } from 'wagmi';

export default function Page() {
  return (
    <>
      <Header />
      <TokenSearch />
      <BiconomyInstance />
    </>
  );
}
