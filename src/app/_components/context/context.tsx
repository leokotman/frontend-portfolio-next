'use client';

import { useContactsQuery } from '@/app/_lib/hooks';
import { IContactsFromDB } from '@/app/_lib/types';
import { ReactNode, useContext, createContext } from 'react';

interface AppContextProviderParams {
  children: ReactNode;
}

export const AppContext = createContext({
  contacts: [] as IContactsFromDB[],
  isLoading: false as boolean,
});

export default function AppContextProvider(params: AppContextProviderParams) {
  const { children } = params;
  const { data: contacts = [], isLoading } = useContactsQuery();

  return (
    <AppContext.Provider value={{ contacts, isLoading }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
