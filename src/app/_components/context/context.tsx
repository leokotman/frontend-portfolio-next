'use client';

import { useContacts } from '@/app/_lib/hooks';
import { IContactsFromDB } from '@/app/_lib/types';
import { ReactNode, useContext, createContext } from 'react';

interface AppContextProviderParams {
  children: ReactNode;
}

export const AppContext = createContext({
  contacts: [] as IContactsFromDB[],
});

export default function AppContextProvider(params: AppContextProviderParams) {
  const { children } = params;
  const { contacts } = useContacts();

  return (
    <AppContext.Provider value={{ contacts }}>{children}</AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
