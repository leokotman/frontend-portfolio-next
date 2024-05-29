import ProjectLayout from '@/app/_components/projectLayout/projectLayout';
import { PROJECTS } from '@/app/_lib/constants';

const Websites = () => {
  return (
    <section className="flex flex-col gap-6 items-center">
      {PROJECTS.map((project) => {
        return <ProjectLayout project={project} key={project.imgSrc} />;
      })}
    </section>
  );
};
export default Websites;
