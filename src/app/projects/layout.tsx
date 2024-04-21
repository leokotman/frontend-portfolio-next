import { Navbar } from '../_components/navbar/navbar';
import { projectsRoutes } from '../_lib/routes';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar routes={projectsRoutes} />
      {children}
    </main>
  );
}
