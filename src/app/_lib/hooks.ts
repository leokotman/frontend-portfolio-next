import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { IContactsFromDB } from './types';
import { useQuery } from '@tanstack/react-query';

const getContacts = async () => {
  const querySnapshot = await getDocs(collection(db, 'contacts'));
  const data: IContactsFromDB[] = [];
  querySnapshot.forEach((contact) => {
    data.push(contact.data() as IContactsFromDB);
  });

  return data;
};

export const useContactsQuery = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => await getContacts(),
  });
};
