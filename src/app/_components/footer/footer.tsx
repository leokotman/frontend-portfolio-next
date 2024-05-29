'use client';

import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import classes from './footer.module.scss';

import { useAppContext } from '../context/context';
import { Button } from '../button/button';

interface FooterParams {
  propClasses?: string;
}

export default function Footer(params: FooterParams) {
  const { propClasses = '' } = params;
  const { contacts, isLoading } = useAppContext();

  return (
    <div className={`${classes.footer} ${propClasses}`}>
      <div className="flex items-center">
        <MapPinIcon className="h-6 w-6" />
        <Button color="teal">
          {isLoading ? 'loading contacts' : contacts[0]?.address}
        </Button>
      </div>
      <div className="flex items-center">
        <PhoneIcon className="h-6 w-6" />
        <Button color="teal">
          {isLoading ? 'loading contacts' : contacts[0]?.phone}
        </Button>
      </div>
    </div>
  );
}
