'use client';
import { ReactNode, createContext } from 'react';
import { IContactsFromDB } from './types';
import { useContacts } from './hooks';

export const AppContext = createContext({ contacts: [] as IContactsFromDB[] });

interface AppContextProviderParams {
  children: ReactNode;
}

export default function AppContextProvider(params: AppContextProviderParams) {
  const { contacts } = useContacts();
  const { children } = params;

  return (
    <AppContext.Provider value={{ contacts: contacts }}>
      {children}
    </AppContext.Provider>
  );
}
