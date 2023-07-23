'use client';

import { ConnectKitProvider } from 'connectkit';
import * as React from 'react';
import { WagmiConfig } from 'wagmi';
import { OwnersProvider } from '../contexts/OwnersContext';
import { config } from '../wagmi';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme='web95'>
        <OwnersProvider>{mounted && children}</OwnersProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
