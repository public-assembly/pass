'use client'

import { getCreate2Addresses } from '../biconomy/getCreate2Addresses';
import { useEffect, useState } from 'react';

export function Playground() {
  // const [ensNameOrShorten, setEnsNameOrShorten] = useState<Hex | string>()

  useEffect(() => {
    //   if (!address) return
    // prettier-ignore
    (async () => {
        getCreate2Addresses({ holdersQueryResponse: [] })
        // try {
        //   const ensName = await viemClient?.getEnsAddress({
        //     name: normalize(address),
        //   })
        //   setEnsNameOrShorten(ensName ? ensName : shortenAddress(address))
        // } catch (error) {
        //   console.log(error)
        // }
      })()
  }, []);

  return <></>;
}
