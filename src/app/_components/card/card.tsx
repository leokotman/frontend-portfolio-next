import { ReactNode } from 'react';
import classes from './card.module.scss';

interface CardParams {
  heading: string;
  children: ReactNode;
  propsClasses?: string;
}

export default function Card(params: CardParams) {
  const { heading, children, propsClasses = '' } = params;
  return (
    <article className={`${classes.card} ${propsClasses}`}>
      <h1 className="text-xl text-center">{heading}</h1>
      {children}
    </article>
  );
}
