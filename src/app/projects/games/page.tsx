'use client';

import { useAppContext } from '@/app/_components/context/context';
import { Loader } from '@/app/_components/loader/loader';
import ProjectLayout from '@/app/_components/projectLayout/projectLayout';

export default function Games() {
  const { projects, isLoadingProjects } = useAppContext();

  return (
    <section className="flex flex-row gap-6 justify-center">
      {isLoadingProjects ? (
        <Loader />
      ) : (
        projects.games.map((game) => {
          return <ProjectLayout key={game.imgSrc} project={game} />;
        })
      )}
    </section>
  );
}
