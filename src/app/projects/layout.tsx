import { Navigation } from '../_components/navbar';
import { projectsRoutes } from '../_lib/routes';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navigation routes={projectsRoutes} />
      {children}
    </section>
  );
}
