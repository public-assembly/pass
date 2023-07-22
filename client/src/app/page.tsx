'use client';

import { Header } from '../components';
import { BiconomyInstance } from '../biconomy/BiconomyInstance';

export default function Page() {
  return (
    <>
      <Header />
      {/* <ServerPlayground /> */}
      <BiconomyInstance />
    </>
  );
}
