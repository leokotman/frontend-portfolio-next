'use client';

import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import classes from './footer.module.scss';

import { useAppContext } from '../context/context';
import { Button } from '../button/button';
import { Loader } from '../loader/loader';

interface FooterParams {
  propClasses?: string;
}

export default function Footer(params: FooterParams) {
  const { propClasses = '' } = params;
  const { contacts, isLoadingContacts } = useAppContext();

  return (
    <div className={`${classes.footer} ${propClasses}`}>
      <div className="flex items-center">
        <MapPinIcon className="h-6 w-6" />
        <Button color="blue">
          {isLoadingContacts ? <Loader /> : contacts?.address}
        </Button>
      </div>
      <div className="flex items-center">
        <PhoneIcon className="h-6 w-6" />
        <Button color="blue">
          {isLoadingContacts ? <Loader /> : contacts?.phone}
        </Button>
      </div>
    </div>
  );
}
