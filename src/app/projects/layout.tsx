import { IRoute, Navbar } from '../components/navbar';

const projectsRoutes: IRoute[] = [
  { url: '/projects/websites', text: 'Websites' },
  { url: '/projects/games', text: 'Games' },
];

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar routes={projectsRoutes} />
      {children}
    </section>
  );
}
