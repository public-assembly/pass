'use client';

import { BiconomyInstance } from '../biconomy/BiconomyInstance';
import { Header, Banner, Authenticate, UpdateMessage } from '../components';
import { Airstack } from '../components/Airstack';
import { useAccount } from 'wagmi';

export default function Page() {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  console.log(isConnected);
  if (address != null) {
    return (
      <>
        <Header />
        <Banner />
        <UpdateMessage />
        {/* <Airstack /> */}
        <BiconomyInstance />
      </>
    );
  } else {
    return <Authenticate />;
  }
}
