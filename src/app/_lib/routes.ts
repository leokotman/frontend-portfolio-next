import { IRoute } from "./types";

export const homeRoutes: IRoute[] = [
  { url: '/', text: 'Home' },
  { url: '/projects', text: 'Projects' },
  { url: '/contacts', text: 'Contacts' },
];

export const projectsRoutes: IRoute[] = [
  { url: '/projects/websites', text: 'Websites' },
  { url: '/projects/games', text: 'Games' },
];