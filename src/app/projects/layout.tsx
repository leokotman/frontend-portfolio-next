import { Navigation } from '../_components/navbar/navbar';
import { projectsRoutes } from '../_lib/routes';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navigation routes={projectsRoutes} />
      {children}
    </main>
  );
}
