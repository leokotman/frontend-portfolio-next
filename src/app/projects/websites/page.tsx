'use client';
import { useMemo } from 'react';

import { useAppContext } from '@/app/_components/context/context';
import { Loader } from '@/app/_components/loader/loader';
import ProjectLayout from '@/app/_components/projectLayout/projectLayout';

const Websites = () => {
  const { projects, isLoadingProjects } = useAppContext();

  const sortedProjects = useMemo(() => {
    return projects.websites.sort((project1, project2) => {
      return (
        Number(project2.imgSrc.split('.')[0]) -
        Number(project1.imgSrc.split('.')[0])
      );
    });
  }, [projects]);

  return (
    <section className="flex flex-col gap-6 items-center">
      {isLoadingProjects ? (
        <Loader />
      ) : (
        sortedProjects.map((project) => {
          return <ProjectLayout project={project} key={project.imgSrc} />;
        })
      )}
    </section>
  );
};
export default Websites;
