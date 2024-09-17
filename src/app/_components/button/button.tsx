import { ReactNode } from 'react';

import styles from './button.module.scss';

type Color = 'blue' | 'grayDark';

interface IButtonParams {
  color: Color;
  children: ReactNode;
}

export function Button(params: IButtonParams) {
  const { color, children } = params;

  return (
    <>
      <button
        className={`border text-indigo-900 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline ${styles[color]}`}
      >
        {children}
      </button>
    </>
  );
}
