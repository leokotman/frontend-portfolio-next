'use client';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import classes from './footer.module.scss';

import { useContext } from 'react';
import { useContacts } from '@/app/_lib/hooks';
import AppContextProvider, { AppContext } from '@/app/_lib/context';

interface FooterParams {
  propClasses?: string;
}

export default function Footer(params: FooterParams) {
  const { propClasses = '' } = params;
  const { contacts: contactsFromContext } = useContext(AppContext);
  // const { contacts } = useContacts();
  console.log('contactsFromContext', contactsFromContext);

  return (
    <AppContextProvider>
      <div className={`${classes.footer} ${propClasses}`}>
        <p>
          <MapPinIcon className="h-6 w-6" />
          {contactsFromContext[0]?.address}
        </p>
        <p>
          <PhoneIcon className="h-6 w-6" />
          {contactsFromContext[0]?.phone}
        </p>
      </div>
    </AppContextProvider>
  );
}
