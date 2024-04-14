import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { IContactsFromDB } from './types';

export const useContacts = () => {
  const [contacts, setContacts] = useState<IContactsFromDB[]>([]);

  const getContacts = async () => {
    const querySnapshot = await getDocs(collection(db, 'contacts'));
    const data: IContactsFromDB[] = [];
    querySnapshot.forEach((contact) => {
      data.push(contact.data() as IContactsFromDB);
    });

    return data;
  };

  useEffect(() => {
    const getContactsFromDB = async () => {
      const contactsFromDB = await getContacts()
        .then((response) => response)
        .then((data) => data);

      if (!isEqual(contactsFromDB, contacts)) {
        setContacts(contactsFromDB as IContactsFromDB[]);
      }
      return contactsFromDB;
    };
    if (isEqual(contacts, [])) {
      getContactsFromDB();
    }
  }, [contacts]);

  return { contacts };
};
