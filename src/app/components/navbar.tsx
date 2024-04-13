'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export interface IRoute {
  url: string;
  text: string;
}

interface NavbarParams {
  routes: Array<IRoute>;
}

export function Navbar(params: NavbarParams) {
  const pathname = usePathname();
  const { routes } = params;

  return (
    <nav>
      <ul className="flex flex-row justify-around">
        {routes.map((route) => (
          <li key={route.url}>
            <Link
              className={`link ${pathname === route.url ? 'active' : ''}`}
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
