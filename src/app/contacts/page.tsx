'use client';

import { useAppContext } from '../_components/context/context';

export default function Contacts() {
  const { contacts } = useAppContext();

  return <main>Contacts</main>;
}
