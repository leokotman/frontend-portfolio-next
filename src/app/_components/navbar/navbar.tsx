'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IRoute } from '../../_lib/types';
import styles from './navbar.module.scss';
import { useState } from 'react';

interface NavbarParams {
  routes: Array<IRoute>;
  iconColor?: 'white' | 'black' | 'blue';
}

export function Navbar(params: NavbarParams) {
  const pathname = usePathname();
  const { routes, iconColor = 'white' } = params;
  const classes = styles;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getActiveClass = (route: IRoute) =>
    pathname === '/' && route.url === '/'
      ? classes.active
      : route.url !== '/' && pathname.includes(route.url)
      ? classes.active
      : '';

  return (
    <nav className={`flex sm:block ${classes.nav}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={iconColor ?? `currentColor`}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={iconColor ?? `currentColor`}
        className="w-6 h-6 sm:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <ul
        className={`flex flex-col sm:flex-row px-10 py-4 justify-around ${
          classes.ul
        } ${isMenuOpen ? '' : 'hidden sm:flex'}`}
      >
        {routes.map((route) => (
          <li key={route.url} className={classes.li}>
            <Link
              className={`link ${getActiveClass(route)} ${classes.navlink}`}
              href={route.url}
            >
              {route.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
