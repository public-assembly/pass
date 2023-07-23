'use client';

import { BiconomyInstance } from '../biconomy/BiconomyInstance';
import { Header } from '../components';
import { Airstack } from '../components/Airstack';

export default function Page() {
  return (
    <>
      <Header />
      <Airstack />
      <BiconomyInstance />
    </>
  );
}
