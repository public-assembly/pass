'use client';

import { BiconomyInstance } from '../biconomy/BiconomyInstance';
import { Header, Banner, Authenticate, UpdateMessage } from '../components';
import { TokenSearch } from '../components/TokenSearch';
import { useAccount } from 'wagmi';

export default function Page() {
  const { isConnected } = useAccount();
  console.log(isConnected)

  if (isConnected) {
    return (
      <>
        <Header />
        <Banner />
        <UpdateMessage />
        {/* <TokenSearch /> */}
        <BiconomyInstance />
      </>
    );
  } else {
    return <Authenticate />;
  }
}
