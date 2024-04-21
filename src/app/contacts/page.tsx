'use client';

import Card from '../_components/card/card';
import { useAppContext } from '../_components/context/context';
import classes from './contacts.module.scss';

export default function Contacts() {
  const { contacts } = useAppContext();

  return (
    <main className="container mx-auto text-center">
      <h1 className="text-2xl">
        Feel free to contact me in any way convenient
      </h1>
      <section className="flex justify-around">
        <Card>
          <ul className="flex flex-col gap-4">
            <li>
              <button className={classes.button}>
                <a href={`'tel:'${contacts[0].phone}`}>{contacts[0].phone}</a>
              </button>
            </li>
            <li>
              <button className={classes.button}>
                <a href={`'mailto:'${contacts[0].email}`}>
                  {contacts[0].email}
                </a>
              </button>
            </li>
          </ul>
        </Card>
        <Card>
          <ul className="flex flex-col gap-4">
            {contacts[0].weblinks.map((link) => {
              return (
                <li key={link.name}>
                  <button className={classes.button}>
                    <a href={`${link.link}`}>{link.name}</a>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
      </section>
      <Card propsClasses="flex flex-col items-center" heading="Map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1501958.7404380776!2d17.029042918818316!3d42.67167099863321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134c3217242c1fcb%3A0x384c9d866effd346!2sMontenegro!5e0!3m2!1sen!2s!4v1713702557374!5m2!1sen!2s"
          width="600"
          height="450"
          // style="border: 0"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Card>
    </main>
  );
}
