import { ReactNode } from 'react';

type Color =
  | 'indigo'
  | 'green'
  | 'red'
  | 'yellow'
  | 'teal'
  | 'grayDark'
  | 'grayLight';

interface IButtonParams {
  color: Color;
  children: ReactNode;
}

export function Button(params: IButtonParams) {
  const { color, children } = params;

  const styles = {
    indigo: 'border-indigo-500 bg-indigo-500 hover:bg-indigo-600',
    green: 'border-green-500 bg-green-500 hover:bg-green-600',
    red: 'border-red-500 bg-red-500 hover:bg-red-600',
    yellow: 'border-yellow-500 bg-yellow-500 hover:bg-yellow-600',
    teal: 'border-teal-500 bg-teal-500 hover:bg-teal-600',
    grayDark: 'border-gray-700 bg-gray-700 hover:bg-gray-800',
    grayLight: 'border-gray-200 bg-gray-200 hover:bg-gray-300',
  };

  return (
    <>
      <button
        className={`border  text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline ${styles[color]}`}
      >
        {children}
      </button>
    </>
  );
}
