'use client';

import { useAppContext } from '@/app/_components/context/context';
import { Loader } from '@/app/_components/loader/loader';
import ProjectLayout from '@/app/_components/projectLayout/projectLayout';

const Websites = () => {
  const { projects, isLoadingProjects } = useAppContext();

  return (
    <section className="flex flex-col gap-6 items-center">
      {isLoadingProjects ? (
        <Loader />
      ) : (
        projects.websites.map((project) => {
          return <ProjectLayout project={project} key={project.imgSrc} />;
        })
      )}
    </section>
  );
};
export default Websites;
