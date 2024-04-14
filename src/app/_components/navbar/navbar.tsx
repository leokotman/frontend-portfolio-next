'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IRoute } from '../../_lib/types';
import styles from './navbar.module.scss';

interface NavbarParams {
  routes: Array<IRoute>;
}

export function Navigation(params: NavbarParams) {
  const pathname = usePathname();
  const { routes } = params;
  const classes = styles;

  const getActiveClass = (route: IRoute) =>
    pathname === '/' && route.url === '/'
      ? classes.active
      : route.url !== '/' && pathname.includes(route.url)
      ? classes.active
      : '';

  return (
    <nav>
      <ul className={`flex flex-row px-10 py-4 justify-around ${classes.ul}`}>
        {routes.map((route) => (
          <li key={route.url} className={classes.li}>
            <Link
              className={`link ${getActiveClass(route)} ${classes.a}`}
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
