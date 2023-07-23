import React, { createContext, useContext, useState } from 'react';

type OwnerAddress = `0x${string}`;

interface OwnersContextValue {
  owners: OwnerAddress[];
  setOwners: React.Dispatch<React.SetStateAction<OwnerAddress[]>>;
}

const OwnersContext = createContext<OwnersContextValue | null>(null);

interface OwnersProviderProps {
  children: React.ReactNode; // Define the children prop explicitly
}

export const OwnersProvider: React.FC<OwnersProviderProps> = ({ children }) => {
  const [owners, setOwners] = useState<OwnerAddress[]>([]);

  return (
    <OwnersContext.Provider value={{ owners, setOwners }}>
      {children}
    </OwnersContext.Provider>
  );
};

export const useOwners = (): OwnersContextValue => {
  const context = useContext(OwnersContext);
  if (!context) {
    throw new Error('useOwners must be used within an OwnersProvider');
  }
  return context;
};
