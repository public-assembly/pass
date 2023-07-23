'use client';

import { useAccount } from 'wagmi';
import { BiconomyInstance } from '../biconomy/BiconomyInstance';
import { Authenticate, Banner, Header, UpdateMessage } from '../components';
import { TokenSearch } from '../components/TokenSearch';

export default function Page() {
  const { isConnected } = useAccount();
  console.log(isConnected);

  if (isConnected) {
    return (
      <>
        <Header />
        <Banner />
        <UpdateMessage />
        <TokenSearch />
        <BiconomyInstance />
      </>
    );
  } else {
    return <Authenticate />;
  }
}
