'use client';

import { useAccount } from 'wagmi';
import { BiconomyInstance } from '../biconomy/BiconomyInstance';
import {
  Authenticate,
  Banner,
  Header,
  UpdateMessage,
  AllowlistDash,
} from '../components';

export default function Page() {
  const { isConnected } = useAccount();
  console.log(isConnected);

  if (isConnected) {
    return (
      <>
        <Header />
        <Banner />
        <UpdateMessage />
        <AllowlistDash />
        <BiconomyInstance />
      </>
    );
  } else {
    return <Authenticate />;
  }
}
