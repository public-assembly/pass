'use client';

import { BiconomyInstance } from '../biconomy/BiconomyInstance';
import { Header } from '../components';
import { TokenSearch } from '../components/TokenSearch';

export default function Page() {
  return (
    <>
      <Header />
      <TokenSearch />
      <BiconomyInstance />
    </>
  );
}
