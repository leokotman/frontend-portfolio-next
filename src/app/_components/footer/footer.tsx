import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import classes from './footer.module.scss';
import { CONTACTS } from '@/app/_lib/constants';

interface FooterParams {
  propClasses?: string;
}

export default function Footer(params: FooterParams) {
  const { propClasses = '' } = params;
  return (
    <div className={`${classes.footer} ${propClasses}`}>
      <p>
        <MapPinIcon className="h-6 w-6" />
        {CONTACTS.address}
      </p>
      <p>
        <PhoneIcon className="h-6 w-6" />
        {CONTACTS.phone}
      </p>
    </div>
  );
}
