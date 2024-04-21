'use client';

import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import classes from './footer.module.scss';

import { useAppContext } from '../context/context';

interface FooterParams {
  propClasses?: string;
}

export default function Footer(params: FooterParams) {
  const { propClasses = '' } = params;
  const { contacts } = useAppContext();

  return (
    <div className={`${classes.footer} ${propClasses}`}>
      <p>
        <MapPinIcon className="h-6 w-6" />
        {contacts[0]?.address}
      </p>
      <p>
        <PhoneIcon className="h-6 w-6" />
        {contacts[0]?.phone}
      </p>
    </div>
  );
}
